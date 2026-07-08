function initialiseChart3D() {
    const container = document.getElementById("chart3dStage");
    if (!container) return;
    if (typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 8, 18);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1.4);
    directional.position.set(5, 8, 6);
    scene.add(directional);

    const bars = [];
    const totalBars = 30;

    for (let i = 0; i < totalBars; i++) {
        const geometry = new THREE.BoxGeometry(0.35, 1, 0.35);
        const material = new THREE.MeshStandardMaterial({
            color: 0x2962ff,
            metalness: 0.25,
            roughness: 0.45
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (i - totalBars / 2) * 0.55;
        scene.add(mesh);
        bars.push(mesh);
    }

    const grid = new THREE.GridHelper(24, 24, 0xe5e7eb, 0xf1f5f9);
    grid.position.y = -1;
    scene.add(grid);

    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        bars.forEach((bar, index) => {
            const h = Math.sin(time + index * 0.4) * 2.4 + 3.5;
            bar.scale.y = h;
            bar.position.y = h / 2 - 0.5;
        });

        scene.rotation.y = Math.sin(time * 0.15) * 0.18;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
