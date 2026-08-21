"use client";

import { useEffect, useRef, useState } from "react";

type DeviceNavigator = Navigator & {
  connection?: { saveData?: boolean };
};

export function TransducerStage() {
  const host = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const nav = navigator as DeviceNavigator;
    const fallback = matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData;
    if (fallback) return;

    const compact = matchMedia("(max-width: 767px)").matches;
    let cancelled = false;
    let started = false;
    let dispose: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
      ]).then(async ([THREE, { GLTFLoader }]) => {
        if (cancelled || !host.current) return;
        const canvas = document.createElement("canvas");
        canvas.setAttribute("aria-hidden", "true");
        host.current.appendChild(canvas);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !compact, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1.5 : 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.4, 5.8);
        scene.add(new THREE.HemisphereLight(0xf6f9f8, 0x0b1f1c, 2.4));
        const key = new THREE.DirectionalLight(0x6fe3ce, 3.2);
        key.position.set(3, 4, 4);
        scene.add(key);

        const gltf = await new GLTFLoader().loadAsync("/models/sonar-transducer_glb.glb");
        if (cancelled) {
          renderer.dispose();
          canvas.remove();
          return;
        }
        const root = gltf.scene.getObjectByName("SonarTransducer") || gltf.scene;
        scene.add(gltf.scene);
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
        const size = box.getSize(new THREE.Vector3()).length();
        gltf.scene.scale.setScalar(2.75 / Math.max(size, 0.001));
        const mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
        const pulses = ["Pulse0", "Pulse1", "Pulse2"]
          .map((name) => gltf.scene.getObjectByName(name))
          .filter((object) => object instanceof THREE.Mesh);
        const timer = new THREE.Timer();
        let raf = 0;
        let inViewport = true;

        function resize() {
          if (!host.current) return;
          const width = host.current.clientWidth;
          const height = host.current.clientHeight;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(17)) / Math.min(camera.aspect, 1)));
          camera.updateProjectionMatrix();
        }
        function render(timestamp?: number) {
          if (!inViewport || document.hidden) return;
          raf = requestAnimationFrame(render);
          timer.update(timestamp);
          const delta = Math.min(timer.getDelta(), 0.05);
          mixer.update(delta);
          for (const pulse of pulses) {
            pulse.scale.multiplyScalar(compact ? 0.68 : 0.75);
            const travel = THREE.MathUtils.clamp((pulse.position.z - 0.03) / 0.34, 0, 1);
            const opacity = Math.sin(travel * Math.PI) * 0.55;
            const materials = Array.isArray(pulse.material) ? pulse.material : [pulse.material];
            materials.forEach((material) => {
              material.transparent = true;
              material.opacity = opacity;
            });
          }
          root.rotation.y += (target.current.x - root.rotation.y) * 0.06;
          root.rotation.x += (target.current.y - root.rotation.x) * 0.06;
          renderer.render(scene, camera);
        }
        const visibilityObserver = new IntersectionObserver(([item]) => {
          inViewport = item.isIntersecting;
          cancelAnimationFrame(raf);
          if (inViewport && !document.hidden) { timer.reset(); render(); }
        }, { threshold: 0.05 });
        visibilityObserver.observe(host.current);
        const onVisibility = () => {
          cancelAnimationFrame(raf);
          if (inViewport && !document.hidden) { timer.reset(); render(); }
        };
        document.addEventListener("visibilitychange", onVisibility);
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host.current);
        resize();
        render();
        setLive(true);

        dispose = () => {
          cancelAnimationFrame(raf);
          visibilityObserver.disconnect();
          resizeObserver.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          timer.dispose();
          mixer.stopAllAction();
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((material) => material.dispose());
            }
          });
          renderer.dispose();
          canvas.remove();
        };
      }).catch(() => undefined);
    }, { rootMargin: "300px" });
    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      dispose?.();
    };
  }, []);

  return (
    <div
      className={`transducer-stage ${live ? "is-live" : ""}`}
      ref={host}
      role="img"
      aria-label="Sonar transducer sending directional wavefronts"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const nx = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const ny = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
        target.current = { x: nx * (Math.PI / 30), y: ny * (Math.PI / 45) };
      }}
      onPointerLeave={() => { target.current = { x: 0, y: 0 }; }}
    >
      <div className="transducer-fallback" aria-hidden="true">
        <span className="beam beam-one" /><span className="beam beam-two" /><span className="beam beam-three" />
        <span className="transducer-core" />
      </div>
    </div>
  );
}
