/* 今日も私は出かける — the street behind the page.
   One low-poly Tokyo street, built from boxes here, rendered small and scaled up with hard pixels.
   Scroll (window.WALK.f, set by main.js) walks the figure from his front door, past each employer
   and school, to the vending machines and home again, while the day runs from 08:00 to 19:30. */
(function () {
    'use strict';
    const root = document.documentElement, canvas = document.getElementById('scene');
    const WALK = window.WALK, bubble = document.getElementById('bubble');
    const bail = () => root.classList.add('no-gl');
    if (!canvas || !WALK || !window.THREE) return bail();
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' }); }
    catch (e) { return bail(); }
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene(), world = new THREE.Group();
    scene.add(world);
    const FOV = 36, camera = new THREE.PerspectiveCamera(FOV, 1, 0.5, 1500);
    scene.fog = new THREE.Fog(0xffffff, 36, 240);

    /* ---------- helpers ---------- */
    const FZ = -2.6;      // building fronts
    const SW = 0.12;      // sidewalk height
    const WZ = -1.15;     // the walker's lane
    const P = 16;         // facade texels per metre
    const FONT = '"Archivo","IBM Plex Sans JP","Hiragino Sans","PingFang SC","Noto Sans CJK JP",sans-serif';
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
    const mix = (a, b, k) => a + (b - a) * k;
    const R = (() => { let s = 20261118; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; })();
    const pick = a => a[Math.floor(R() * a.length)];

    const mats = {};
    const lam = c => mats[c] || (mats[c] = new THREE.MeshLambertMaterial({ color: c }));
    const M = m => typeof m === 'number' ? lam(m) : m;
    const unit = new THREE.BoxGeometry(1, 1, 1);
    const pyramid = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4); pyramid.rotateY(Math.PI / 4);   // 1×1 base
    const glows = [];      // [material, gain] — emissive follows nightfall
    let OX = 0;            // added to the x of anything placed straight into the world; slides a whole block along the street
    const redraw = [];     // sign painters, run again once web fonts arrive

    function grp(x, y, z, p) { const g = new THREE.Group(); g.position.set(p ? x : x + OX, y, z); (p || world).add(g); return g; }
    /* box sitting on y, centred on x/z */
    function B(w, h, d, m, x, y, z, p, shadow) {
        const o = new THREE.Mesh(unit, M(m)); o.scale.set(w, h, d); o.position.set(p ? x : x + OX, y + h / 2, z);
        o.castShadow = shadow !== false; o.receiveShadow = true; (p || world).add(o); return o;
    }
    function C(rt, rb, h, seg, m, x, y, z, p) {
        const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), M(m)); o.position.set(p ? x : x + OX, y + h / 2, z);
        o.castShadow = o.receiveShadow = true; (p || world).add(o); return o;
    }
    function roof(w, h, d, m, x, y, z, p) {
        const o = new THREE.Mesh(pyramid, M(m)); o.scale.set(w, h, d); o.position.set(p ? x : x + OX, y + h / 2, z);
        o.castShadow = true; (p || world).add(o); return o;
    }
    function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
    function px(c) { const t = new THREE.CanvasTexture(c); t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; return t; }
    function tile(w, h, rx, ry, draw) {
        const c = cv(w, h); draw(c.getContext('2d')); const t = px(c);
        t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); return t;
    }
    /* a facade: draw(d, e, w, h) in metres from the bottom-left; d paints daylight, e paints what glows at night */
    function paint(w, h, draw) {
        const W = Math.round(w * P), H = Math.round(h * P), c = cv(W, H), ec = cv(W, H);
        const g = c.getContext('2d'), eg = ec.getContext('2d');
        eg.fillStyle = '#000'; eg.fillRect(0, 0, W, H);
        const r = ctx => (x, y, ww, hh, col) => { ctx.fillStyle = col; const X = Math.round(x * P), Y = H - Math.round((y + hh) * P); ctx.fillRect(X, Y, Math.max(1, Math.round((x + ww) * P) - X), Math.max(1, H - Math.round(y * P) - Y)); };
        draw(r(g), r(eg), w, h);
        const m = new THREE.MeshLambertMaterial({ map: px(c), emissive: 0xffffff, emissiveMap: px(ec), emissiveIntensity: 0 });
        glows.push([m, 1]); return m;
    }
    function wins(d, e, o) {
        const lit = o.lit == null ? .5 : o.lit;
        for (let r = 0; r < o.rows; r++) for (let c = 0; c < o.cols; c++) {
            const x = o.x + c * o.dx, y = o.y + r * o.dy;
            d(x - .07, y - .07, o.w + .14, o.h + .14, o.frame || '#3c4654');
            d(x, y, o.w, o.h, o.glass || '#6f8fa8'); d(x, y + o.h * .5, o.w, o.h * .5, o.shine || '#8fb0c6');
            if (o.bar) d(x + o.w / 2 - .035, y, .07, o.h, o.frame || '#3c4654');
            if (R() < lit) e(x, y, o.w, o.h, R() < .3 ? '#fff1c9' : (o.litCol || '#ffd58a'));
        }
    }
    function bldg(o) {
        const s = lam(o.side), t = lam(o.roof || 0x8a8d92), z = o.z == null ? FZ : o.z;
        const m = new THREE.Mesh(unit, [s, s, t, t, o.front, s]);
        m.scale.set(o.w, o.h, o.d); m.position.set(o.x + OX, o.h / 2, z - o.d / 2);
        m.castShadow = m.receiveShadow = true; world.add(m); return m;
    }
    /* a lettered board; lights up after dark */
    function sign(text, w, h, x, y, z, o, p) {
        o = o || {};
        const S = 40, W = Math.round(w * S), H = Math.round(h * S), c = cv(W, H), g = c.getContext('2d');
        const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
        const draw = () => {
            g.fillStyle = o.bg || '#fff'; g.fillRect(0, 0, W, H);
            if (o.border) { g.strokeStyle = o.border; g.lineWidth = 4; g.strokeRect(2, 2, W - 4, H - 4); }
            let fs = Math.round(H * (o.size || .62)); const f = n => (o.weight || 800) + ' ' + n + 'px ' + FONT;
            g.font = f(fs); const tw = g.measureText(text).width; if (tw > W * .86) { fs = Math.floor(fs * W * .86 / tw); g.font = f(fs); }
            g.fillStyle = o.fg || '#111'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, W / 2, H / 2 + fs * .05);
            t.needsUpdate = true;
        };
        draw(); redraw.push(draw);
        const m = new THREE.MeshLambertMaterial({ map: t, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0 });
        glows.push([m, o.glow == null ? .75 : o.glow]);
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); mesh.position.set(p ? x : x + OX, y + h / 2, z); mesh.receiveShadow = true;
        (p || world).add(mesh); return mesh;
    }
    function tree(x, z, o) {
        o = o || {}; const g = grp(x, 0, z), h = o.h || 3.4, s = o.s || 1, c = o.c || 0x4f8a52, c2 = o.c2 || 0x66a05e;
        B(.3, h * .5, .3, 0x6b4c36, 0, 0, 0, g);
        B(2 * s, 1.4 * s, 2 * s, c, 0, h * .42, 0, g).rotation.y = .3;
        B(1.5 * s, 1.1 * s, 1.5 * s, c2, .15, h * .42 + 1.1 * s, -.1, g).rotation.y = .8;
        B(.9 * s, .8 * s, .9 * s, c, -.1, h * .42 + 2 * s, .05, g).rotation.y = .2;
        return g;
    }
    function bike(x, z, col, rot) {
        const g = grp(x, SW, z), wm = lam(0x2a2a2e); g.rotation.y = rot || 0;
        [-.52, .52].forEach(dx => { const w = new THREE.Mesh(new THREE.TorusGeometry(.3, .04, 4, 10), wm); w.position.set(dx, .34, 0); w.castShadow = true; g.add(w); });
        const bar = (len, a, bx, by) => { const m = B(len, .06, .06, col, bx, by, 0, g); m.rotation.z = a; };
        bar(.78, .52, -.2, .5); bar(.72, -.72, .18, .52); bar(.62, 0, -.02, .78); bar(.5, 1.35, -.44, .6); bar(.6, 1.2, .46, .62);
        B(.26, .07, .16, 0x222226, -.38, .86, 0, g); B(.07, .07, .5, 0x222226, .38, .94, 0, g);
        B(.32, .22, .3, 0xa89a80, .56, .7, 0, g);
        return g;
    }
    function planter(x, z, w) { B(w, .45, .5, 0x8d877a, x, SW, z); B(w - .12, .4, .38, 0x4f8a52, x, SW + .4, z); }
    function fence(x0, x1, col) { B(x1 - x0, 1.5, .22, col || 0xbdb7aa, (x0 + x1) / 2, 0, FZ - .5); B(x1 - x0 + .1, .1, .32, 0xa8a296, (x0 + x1) / 2, 1.5, FZ - .5); }

    /* ---------- sky ---------- */
    const skyU = {
        top: { value: new THREE.Color() }, bot: { value: new THREE.Color() },
        sunDir: { value: new THREE.Vector3(0, 1, 0) }, sunCol: { value: new THREE.Color() },
        moonDir: { value: new THREE.Vector3(0, 1, 0) }, night: { value: 0 }
    };
    const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 24, 12), new THREE.ShaderMaterial({
        uniforms: skyU, side: THREE.BackSide, depthWrite: false, fog: false,
        vertexShader: 'varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
        fragmentShader: [
            'uniform vec3 top,bot,sunDir,sunCol,moonDir;uniform float night;varying vec3 vD;',
            'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
            'void main(){vec3 d=normalize(vD);vec3 c=mix(bot,top,smoothstep(-0.02,0.4,d.y));',
            'float s=max(dot(d,sunDir),0.0);c+=sunCol*(step(0.99935,s)*0.85+pow(s,28.0)*0.2);',
            'float m=max(dot(d,moonDir),0.0);c=mix(c,vec3(1.0,0.97,0.84),step(0.99955,m)*night);',
            'vec2 g=floor(vec2(atan(d.x,-d.z),d.y)*150.0);c+=vec3(step(0.9962,hash(g)))*night*step(0.02,d.y)*0.75;',
            'gl_FragColor=vec4(c,1.0);}'
        ].join('\n')
    }));
    sky.frustumCulled = false; scene.add(sky);

    const fuji = grp(0, 0, -520);
    const fujiM = new THREE.MeshBasicMaterial({ fog: false }), snowM = new THREE.MeshBasicMaterial({ fog: false });
    fuji.add(new THREE.Mesh(new THREE.CylinderGeometry(9, 78, 34, 9), fujiM));
    { const cap = new THREE.Mesh(new THREE.CylinderGeometry(9, 22, 9, 9), snowM); cap.position.y = 12.6; cap.scale.setScalar(1.01); fuji.add(cap); }
    fuji.children[0].position.y = 0; fuji.position.y = 16;

    const cloudM = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x777777, fog: false }), clouds = [];
    for (let i = 0; i < 9; i++) {
        const g = grp(-60 + i * 28 + R() * 14, 15 + R() * 12, -70 - R() * 50);
        for (let k = 0; k < 3; k++) B(5 + R() * 5, 1.6 + R() * 1.2, 3, cloudM, k * 4 - 4, R() * 1.2, R() * 2, g, false);
        g.userData.v = .25 + R() * .3; clouds.push(g);
    }

    /* ---------- ground ---------- */
    const L = 900, CX = 60;   // the street is one long strip
    B(L, .2, 4.8, 0x4d5058, CX, -.2, 2.6, world, false);                                      // road
    B(L, .32, 2.8, new THREE.MeshLambertMaterial({ map: tile(32, 32, L / 1.6, 1.75, g => {
        g.fillStyle = '#cbc5b6'; g.fillRect(0, 0, 32, 32); g.fillStyle = '#b6b0a0';
        g.fillRect(0, 0, 32, 1); g.fillRect(0, 16, 32, 1); g.fillRect(0, 0, 1, 16); g.fillRect(16, 16, 1, 16);
    }) }), CX, -.2, -1.2, world, false);                                                    // sidewalk
    B(L, .34, .2, 0xdad6cb, CX, -.2, .2, world, false);                                     // curb
    B(L, .02, .34, new THREE.MeshLambertMaterial({ map: tile(8, 8, L / .34, 1, g => {
        g.fillStyle = '#f2c029'; g.fillRect(0, 0, 8, 8); g.fillStyle = '#d8a71a'; g.fillRect(1, 1, 2, 2); g.fillRect(5, 1, 2, 2); g.fillRect(1, 5, 2, 2); g.fillRect(5, 5, 2, 2);
    }) }), CX, SW, -.2, world, false);                                                      // tactile paving
    B(L, .3, 260, 0x8f9186, CX, -.2, FZ - 130, world, false);                               // lots behind
    B(L, .32, 90, new THREE.MeshLambertMaterial({ map: tile(32, 32, L / 2.4, 37.5, g => {
        g.fillStyle = '#b9b4a6'; g.fillRect(0, 0, 32, 32); g.fillStyle = '#aaa597'; g.fillRect(0, 0, 32, 1); g.fillRect(0, 0, 1, 32);
    }) }), CX, -.2, 50, world, false);                                                      // near sidewalk
    B(L, .02, .12, 0xe9e7e0, CX, 0, .78, world, false);
    for (let x = -40; x < 200; x += 3) if (Math.abs(x - 84.5) > 2.6) B(1.4, .02, .14, 0xe9e7e0, x, 0, 2.7, world, false);
    for (let z = 1.2; z < 4.8; z += .9) B(3.2, .02, .46, 0xe9e7e0, 84.5, 0, z, world, false);  // zebra crossing
    [[-60, 82.4], [86.6, 220]].forEach(([a, b]) => {                                        // guard rail on the near side
        B(b - a, .28, .06, 0xf1efe9, (a + b) / 2, .52, 5.15, world, false);
        for (let x = a; x <= b; x += 2.2) B(.1, .8, .1, 0xdedbd2, x, SW, 5.2, world, false);
    });

    /* ---------- far city ---------- */
    {
        const N = 130, im = new THREE.InstancedMesh(unit, new THREE.MeshLambertMaterial({
            emissive: 0xffffff, emissiveIntensity: 0, emissiveMap: tile(16, 32, 1, 1, g => {
                g.fillStyle = '#000'; g.fillRect(0, 0, 16, 32); g.fillStyle = '#ffd58a';
                for (let y = 2; y < 32; y += 4) for (let x = 1; x < 16; x += 3) if (R() < .45) g.fillRect(x, y, 2, 2);
            })
        }), N);
        const d = new THREE.Object3D(), col = new THREE.Color(), tones = [0xb9b3ad, 0xa7adb6, 0xc4bcae, 0x9ea4a8, 0xb0a79f];
        for (let i = 0; i < N; i++) {
            const z = -13 - Math.pow(R(), .8) * 70, far = (-z - 13) / 70, h = 6 + R() * 8 + far * 20 * R();
            d.position.set(-50 + R() * 260, h / 2, z); d.scale.set(4 + R() * 6, h, 4 + R() * 5); d.updateMatrix();
            im.setMatrixAt(i, d.matrix); im.setColorAt(i, col.setHex(pick(tones)));
        }
        im.frustumCulled = false; world.add(im); glows.push([im.material, .9]);
    }

    /* ---------- street furniture ---------- */
    const pools = [];
    const poolT = (() => { const c = cv(32, 32), g = c.getContext('2d'); [[15, '#2e2716'], [11, '#6b5a30'], [7, '#b3964e']].forEach(([r, col]) => { g.fillStyle = col; g.beginPath(); g.arc(16, 16, r, 0, 7); g.fill(); }); return px(c); })();
    function pool(x, z, r, col) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2), new THREE.MeshBasicMaterial({ map: poolT, color: col || 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
        m.rotation.x = -Math.PI / 2; m.position.set(x + OX, SW + .03, z); world.add(m); pools.push(m.material); return m;
    }
    const lampM = new THREE.MeshLambertMaterial({ color: 0xe8e4d8, emissive: 0xfff0c0, emissiveIntensity: 0 }); glows.push([lampM, 1]);
    const poleM = 0x8a857c;
    [-16, -5, 6.4, 18, 29.8, 40.4, 51.6, 61.8, 74.4, 82.6, 99.9, 112.4, 125.2, 138.2, 148.2, 160].forEach((x, i) => {
        B(.24, 6.9, .24, poleM, x, 0, .05);
        B(.1, .1, 1.5, poleM, x, 6.2, .05, world, false); B(.1, .1, 1.3, poleM, x, 5.7, .05, world, false);
        if (i % 3 === 1) B(.5, .8, .5, 0x9aa0a6, x + .3, 4.9, .05);
        B(.08, .08, 1.3, poleM, x, 4.5, -.55, world, false); B(.5, .12, .34, lampM, x, 4.38, -1.15, world, false);
        pool(x, -1.1, 2.6, 0xffe2a8);
    });
    [[6.2, -.6], [6.2, .7], [5.7, -.5], [5.7, .6]].forEach(([y, z]) => B(L, .03, .03, 0x4a4f5a, CX, y, z + .05, world, false));
    // stop sign and traffic mirror at the crossing
    { const g = grp(82.6, 0, .05);
      const s = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, .05, 3), lam(0xc93a22)); s.rotation.set(Math.PI / 2, 0, Math.PI); s.position.set(-.5, 2.6, -.2); g.add(s);
      B(.06, .06, .5, poleM, -.25, 2.6, -.1, g, false);
      const mir = new THREE.Mesh(new THREE.CylinderGeometry(.4, .4, .08, 10), lam(0xf08a24)); mir.rotation.x = Math.PI / 2; mir.position.set(.55, 3.4, .2); g.add(mir);
      const gl = new THREE.Mesh(new THREE.CylinderGeometry(.32, .32, .09, 10), lam(0xbfd6e4)); gl.rotation.x = Math.PI / 2; gl.position.set(.55, 3.4, .21); g.add(gl);
      B(.5, .06, .06, poleM, .3, 3.4, .1, g, false); }

    /* ---------- the buildings ---------- */
    const GL = { glass: '#7d9db3', shine: '#a9c4d4', frame: '#f6f2e8' };
    function house(x, lit) {
        const w = 6.6, h = 5.4, d = 5.4, on = lit ? 1 : 0;
        const front = paint(w, h, (p, e) => {
            p(0, 0, w, h, '#efe4cf'); p(0, 0, w, .45, '#b3a892'); p(0, 2.62, w, .14, '#d3c5ab');
            p(3.85, .12, 1.2, 2.2, '#4d3526'); p(3.95, .12, 1, 2.1, '#7a553e'); p(4.1, 1.2, .3, .75, '#c9d8de'); p(4.72, 1.05, .09, .18, '#e8d18a');
            if (lit) e(4.1, 1.2, .3, .75, '#ffd58a');
            wins(p, e, Object.assign({ x: .8, y: .95, cols: 2, rows: 1, w: 1.05, h: 1.25, dx: 1.12, dy: 0, lit: on }, GL));
            wins(p, e, Object.assign({ x: .8, y: 3.3, cols: 2, rows: 1, w: 1.05, h: 1.35, dx: 1.12, dy: 0, lit: on }, GL));
            wins(p, e, Object.assign({ x: 4.0, y: 3.55, cols: 1, rows: 1, w: 1.1, h: 1, dx: 0, dy: 0, lit: 0 }, GL));
        });
        bldg({ x, w, h, d, front, side: 0xd9cdb6, roof: 0x434859 });
        B(w + .6, .16, d + .6, 0x363b4a, x, h, FZ - d / 2);
        roof(w + .3, 1.9, d + .3, 0x434859, x, h + .16, FZ - d / 2);
        const g = grp(x - w / 2, 0, FZ);
        B(1.5, .14, .6, 0xa8a296, 4.45, SW, .32, g);                                                   // genkan step
        B(1.7, .1, .8, 0x434859, 4.45, 2.42, .4, g);                                                   // porch roof
        sign('LIU', .62, .28, 5.62, 1.62, .03, { bg: '#f8f4ea', fg: '#1c2230', size: .8, glow: .3 }, g);
        B(.34, .26, .14, 0xc93a22, 5.62, 1.2, .08, g);                                                 // letter box
        B(3.1, .5, .7, 0xf2ecdf, 1.85, 2.75, .36, g); B(3.1, .06, .06, 0x6b6f78, 1.85, 3.9, .62, g, false);
        if (!lit) [[.9, 0xffffff], [1.5, 0xf2b632], [2.2, 0x5a84c4], [2.75, 0xffffff]].forEach(([lx, c]) => B(.42, .55, .04, c, lx, 3.33, .62, g));   // laundry, taken in by evening
        B(.8, .6, .32, 0xdcdcd6, .55, SW, .22, g); B(.5, .42, .02, 0x9aa0a6, .55, SW + .09, .39, g, false);   // air conditioner
        [[5.5, 0x4f8a52, .5], [6.05, 0x66a05e, .36]].forEach(([px_, c, ph]) => { B(.34, .3, .34, 0xa9623f, px_, SW, .35, g); B(.42, ph, .42, c, px_, SW + .3, .35, g); });
        return g;
    }

    // 01 · home, morning
    house(0, false);
    bike(-1.7, FZ + .5, 0x3f7ea6);
    fence(3.4, 7.9);
    tree(5.6, FZ - 1.6);
    const cat = grp(4.25, 1.6, FZ - .5);
    B(.5, .26, .22, 0xe9e3d6, 0, 0, 0, cat); B(.24, .22, .24, 0xe9e3d6, .3, .16, 0, cat);
    B(.07, .09, .06, 0xd9a35c, .23, .38, .07, cat, false); B(.07, .09, .06, 0xd9a35c, .37, .38, -.07, cat, false);
    const tail = grp(-.25, .1, 0, cat); B(.07, .34, .07, 0xd9a35c, 0, 0, 0, tail);

    // 02 · ExaWizards — exaBase AI on the lobby screen, mid-answer
    fence(16.1, 19.9);
    bldg({ x: 12, w: 8, h: 14, d: 7, side: 0xd5d9e0, front: paint(8, 14, (p, e, w, h) => {
        p(0, 0, w, h, '#eef1f5');
        for (let y = 4.6; y < h - .6; y += 1.55) { p(.4, y, 7.2, 1.0, '#2f3b57'); wins(p, e, { x: .5, y: y + .08, cols: 7, rows: 1, w: .9, h: .84, dx: 1.02, dy: 0, glass: '#7f9fc0', shine: '#a8c2dc', frame: '#2f3b57', lit: .55 }); }
        p(0, 4.0, w, .22, '#2f3b57');
        p(.5, .12, 3.6, 2.6, '#2f3b57'); p(.6, .22, 3.4, 2.4, '#4a6283'); p(.6, 1.5, 3.4, 1.12, '#6480a3'); e(.6, .22, 3.4, 2.4, '#e6f0ff');
        p(1.7, .12, 1.2, 2.2, '#1d2638'); p(2.26, .12, .08, 2.2, '#eef1f5');
    }) });
    sign('ExaWizards', 4.4, .8, 10.4, 2.95, FZ + .06, { bg: '#2f3b57', fg: '#fff', size: .6 });
    const typing = [];
    { const g = grp(14.25, .95, FZ + .08);
      B(2.7, 2.3, .12, 0x1c2230, 0, 0, 0, g);
      const t = px((() => { const c = cv(40, 34), q = c.getContext('2d');
          q.fillStyle = '#f4f7fb'; q.fillRect(0, 0, 40, 34); q.fillStyle = '#2f3b57'; q.fillRect(0, 0, 40, 6); q.fillStyle = '#8fd0ff'; q.fillRect(2, 2, 2, 2); q.fillStyle = '#fff'; q.fillRect(6, 2, 14, 2);
          q.fillStyle = '#3f7fd6'; q.fillRect(16, 9, 21, 6); q.fillStyle = '#dbe6f5'; q.fillRect(22, 11, 12, 1); q.fillRect(19, 13, 15, 1);
          q.fillStyle = '#dfe4ec'; q.fillRect(3, 18, 26, 8); q.fillStyle = '#7b8798'; q.fillRect(5, 20, 20, 1); q.fillRect(5, 22, 22, 1); q.fillRect(5, 24, 14, 1);
          q.fillStyle = '#dfe4ec'; q.fillRect(3, 28, 13, 5); return c; })());
      const s = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 2.1), new THREE.MeshBasicMaterial({ map: t })); s.position.set(0, 1.15, .07); g.add(s);
      for (let i = 0; i < 3; i++) { const m = new THREE.MeshBasicMaterial({ color: 0x7b8798 }); typing.push(m); B(.1, .1, .02, m, -.88 + i * .2, .24, .08, g, false); } }
    B(2.2, .14, .7, 0xc5cad4, 10.3, SW, FZ + .36);

    // 03 · Rakuten — glass tower
    OX = 12;
    bldg({ x: 12, w: 8, h: 16, d: 7, side: 0x4f7594, front: paint(8, 16, (p, e, w, h) => {
        p(0, 0, w, h, '#6a93b5');
        for (let y = 4.4; y < h; y += 1.1) for (let x = 0; x < w; x += 1) {
            p(x + .06, y + .08, .9, 1, R() < .3 ? '#7fa6c6' : '#5f88ab');
            if (R() < .4) e(x + .06, y + .08, .9, 1, R() < .5 ? '#ffe2a6' : '#cfe6ff');
        }
        p(0, 0, w, 4.3, '#e9e6df'); p(0, 4.12, w, .2, '#c9c4b6');
        p(.6, .12, 6.8, 2.6, '#2f4a60'); p(.6, 1.5, 6.8, 1.22, '#4a6c86'); e(.6, .12, 6.8, 2.6, '#ffe9bd');
        for (let x = .6; x < 7.5; x += 1.7) p(x - .04, .12, .09, 2.6, '#e9e6df');
        p(3.3, .12, 1.4, 2.25, '#1f3446'); p(3.96, .12, .08, 2.25, '#e9e6df');
    }) });
    sign('Rakuten', 4.6, .95, 12, 3.05, FZ + .06, { bg: '#b80d16', fg: '#fff' });
    B(3.2, .14, 1.1, 0xd8d4c8, 12, 2.78, FZ + .55);
    planter(9.3, FZ + .5, 1.6); planter(14.7, FZ + .5, 1.6);

    // 05 · Mercari — parcels waiting to ship
    OX = 23;
    fence(16.1, 19.4);
    bldg({ x: 23, w: 7, h: 9.6, d: 6, side: 0xd8d5cd, front: paint(7, 9.6, (p, e, w, h) => {
        p(0, 0, w, h, '#eeebe4');
        for (let y = 4.3; y < h - .8; y += 1.75) { p(.5, y, 6, 1.05, '#3c4654'); wins(p, e, { x: .58, y: y + .08, cols: 6, rows: 1, w: .88, h: .9, dx: .99, dy: 0, frame: '#3c4654', lit: .45 }); }
        p(0, 0, .42, h, '#e2483c'); p(0, 4.02, w, .14, '#d6d2c8');
        p(1, .12, 5.4, 2.6, '#34485a'); p(1, 1.5, 5.4, 1.22, '#4f6d84'); e(1, .12, 5.4, 2.6, '#ffe9bd');
        p(3, .12, 1.3, 2.2, '#22323f'); p(3.61, .12, .08, 2.2, '#eeebe4');
    }) });
    sign('mercari', 4.2, .9, 23.4, 3.0, FZ + .06, { bg: '#ffffff', fg: '#e2483c', border: '#e2483c' });
    { const g = grp(20.9, SW, FZ + .75), box = 0xc9a26b, tape = 0xe8d9b8;
      [[0, 0, .7, .5], [.75, 0, .6, .6], [.1, .5, .55, .42], [.72, .6, .5, .36], [1.45, 0, .5, .4]].forEach(([bx, by, bw, bh]) => { B(bw, bh, .55, box, bx, by, 0, g); B(.08, bh + .01, .56, tape, bx, by, 0, g, false); });
      B(.9, .08, .6, 0x3f7ea6, 2.6, .16, 0, g); B(.06, 1.1, .06, 0x3f7ea6, 3.02, .16, 0, g); B(.6, .5, .5, box, 2.55, .24, 0, g);
      [2.3, 2.9].forEach(wx => B(.16, .16, .1, 0x222226, wx, 0, .26, g)); }

    // 04 · Desoul — part-time work on DODOFLASH, so: a café table with a laptop
    OX = 1;
    tree(28.7, FZ - 1.4); fence(26.6, 30.7, 0xc7c0b2);
    bldg({ x: 34, w: 6.4, h: 6.8, d: 5.4, side: 0xd3c7b0, roof: 0x6b5a4c, front: paint(6.4, 6.8, (p, e, w, h) => {
        p(0, 0, w, h, '#eadfca'); p(0, 0, w, 3.5, '#2f5d4d'); p(0, 3.5, w, .16, '#1f4437');
        p(.5, .7, 3.3, 2.1, '#1f4437'); p(.6, .8, 3.1, 1.9, '#c9a56a'); p(.6, .8, 3.1, .7, '#8a6a44'); e(.6, .8, 3.1, 1.9, '#ffcf82');
        p(2.1, .8, .08, 1.9, '#1f4437');
        p(4.4, .12, 1.2, 2.5, '#1f4437'); p(4.52, .12, .96, 2.38, '#7a553e'); p(4.66, 1.2, .68, 1.1, '#c9a56a'); e(4.66, 1.2, .68, 1.1, '#ffcf82');
        wins(p, e, Object.assign({ x: 1, y: 4.5, cols: 2, rows: 1, w: 1.2, h: 1.3, dx: 3.1, dy: 0, bar: 1, lit: .6 }, GL));
    }) });
    sign('DESOUL', 3.2, .62, 33.2, 3.74, FZ + .05, { bg: '#f4efe2', fg: '#1f4437', size: .66 });
    { const g = grp(34, 0, FZ);
      for (let i = 0; i < 7; i++) { const a = B(.5, .08, 1.15, i % 2 ? 0xf4efe2 : 0x2f5d4d, -2.45 + i * .5, 3.0, .5, g); a.rotation.x = .42; }   // awning
      B(.9, .06, .7, 0x8a6a44, -1.5, SW + .72, 1.0, g); B(.08, .72, .08, 0x33363d, -1.5, SW, 1.0, g);                                       // table
      B(.42, .03, .3, 0xc9ccd2, -1.5, SW + .78, 1.0, g); const scr = B(.42, .3, .03, 0xc9ccd2, -1.5, SW + .8, .84, g); scr.rotation.x = -.2;
      const glowM = new THREE.MeshBasicMaterial({ color: 0xbfe0ff }); B(.36, .24, .01, glowM, -1.5, SW + .83, .86, g, false).rotation.x = -.2;
      B(.44, .06, .44, 0x8a6a44, -2.35, SW + .44, 1.0, g); B(.06, .52, .44, 0x8a6a44, -2.56, SW + .5, 1.0, g); B(.3, .44, .3, 0x33363d, -2.35, SW, 1.0, g);
      const a1 = B(.74, 1.1, .05, 0x2b2f3a, 1.0, SW, 1.1, g); a1.rotation.x = -.22; sign('OPEN', .62, .36, 1.0, SW + .56, 1.14, { bg: '#2b2f3a', fg: '#f4efe2', glow: .2, size: .8 }, g).rotation.x = -.22; }

    // 06 · ExaWizards again — the summer internship, a year and a half earlier
    OX = 12;
    tree(39.4, FZ - 1.6, { s: .9 }); fence(37.3, 41.2);
    bldg({ x: 45, w: 7.4, h: 12.4, d: 6.5, side: 0x27324a, front: paint(7.4, 12.4, (p, e, w, h) => {
        p(0, 0, w, h, '#2f3b57');
        wins(p, e, { x: .7, y: 4.5, cols: 4, rows: 5, w: 1.1, h: 1.05, dx: 1.63, dy: 1.6, glass: '#7f9fc0', shine: '#a8c2dc', frame: '#eef0f4', lit: .5 });
        p(0, 0, w, 3.9, '#eef0f4'); p(0, 3.72, w, .2, '#c5cad4');
        p(.8, .12, 5.8, 2.5, '#2f3b57'); p(.9, .22, 5.6, 2.3, '#4a6283'); p(.9, 1.5, 5.6, 1.02, '#6480a3'); e(.9, .22, 5.6, 2.3, '#e6f0ff');
        p(3.05, .12, 1.3, 2.2, '#1d2638'); p(3.66, .12, .08, 2.2, '#eef0f4');
    }) });
    sign('ExaWizards', 4.8, .8, 45, 2.82, FZ + .06, { bg: '#eef0f4', fg: '#2f3b57', size: .6 });
    B(2.2, .14, .7, 0xc5cad4, 45, SW, FZ + .36);

    // 07 · Alibaba — the Taote live-streaming years in Hangzhou
    bldg({ x: 56, w: 10.4, h: 7.8, d: 7, side: 0xdcd4c4, front: paint(10.4, 7.8, (p, e, w, h) => {
        p(0, 0, w, h, '#f2ecdf');
        [4.0, 5.7].forEach(y => { p(0, y - .3, w, .22, '#f07b22'); wins(p, e, { x: .5, y, cols: 9, rows: 1, w: .86, h: 1.05, dx: 1.07, dy: 0, frame: '#5a4a3c', lit: .5 }); });
        p(0, 7.3, w, .5, '#f07b22'); p(0, 3.42, w, .16, '#d5cab3');
        p(.6, .12, 4, 2.5, '#3a3f4c'); p(.7, .22, 3.8, 2.3, '#5b6f86'); p(.7, 1.5, 3.8, 1.02, '#7890a8'); e(.7, .22, 3.8, 2.3, '#ffe9bd');
        p(2.05, .12, 1.2, 2.2, '#262a34'); p(2.61, .12, .08, 2.2, '#f2ecdf');
    }) });
    sign('Alibaba 杭州', 4.4, .78, 53.2, 2.66, FZ + .06, { bg: '#f07b22', fg: '#fff', size: .6 });
    { const g = grp(59.6, 1.0, FZ + .08);                                                    // the LIVE screen
      B(3.3, 2.1, .12, 0x1c2230, 0, 0, 0, g);
      const t = px((() => { const c = cv(48, 30), q = c.getContext('2d');
          q.fillStyle = '#ffb8a0'; q.fillRect(0, 0, 48, 30); q.fillStyle = '#ff8f6b'; q.fillRect(0, 18, 48, 12);
          q.fillStyle = '#3a2a2a'; q.fillRect(19, 7, 10, 9); q.fillStyle = '#ffe0cc'; q.fillRect(20, 10, 8, 8); q.fillStyle = '#5a84c4'; q.fillRect(16, 18, 16, 12);
          q.fillStyle = '#fff'; q.fillRect(35, 20, 10, 2); q.fillRect(35, 24, 7, 2); q.fillRect(3, 24, 9, 2);
          q.fillStyle = '#1c2230'; q.fillRect(2, 2, 17, 7); q.fillStyle = '#fff'; q.font = 'bold 6px sans-serif'; q.fillText('LIVE', 7, 8); return c; })());
      const s = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.9), new THREE.MeshBasicMaterial({ map: t })); s.position.set(0, 1.05, .07); g.add(s); }
    const liveDot = B(.14, .14, .02, new THREE.MeshBasicMaterial({ color: 0xff3b30 }), 58.32, 2.64, FZ + .16, world, false);
    bike(62.4, FZ + .5, 0xf2b632, .1); bike(63.5, FZ + .55, 0x3f9bd6, -.08);

    // 08 · TP-LINK — routers, and a very large one on the roof
    bldg({ x: 67, w: 7, h: 5.3, d: 6, side: 0xc9cdd0, front: paint(7, 5.3, (p, e, w, h) => {
        p(0, 0, w, h, '#e3e6e8'); p(0, 4.86, w, .44, '#3fb6c4'); p(0, 3.26, w, .12, '#c2c7cb');
        wins(p, e, { x: .6, y: 3.62, cols: 5, rows: 1, w: .95, h: 1.0, dx: 1.21, dy: 0, frame: '#4a5560', bar: 1, lit: .5 });
        p(.6, .12, 3.2, 2.3, '#3c4654'); p(.7, .22, 3, 2.1, '#6f8fa8'); p(.7, 1.4, 3, .92, '#8fb0c6'); e(.7, .22, 3, 2.1, '#e6f0ff');
        p(4.6, .12, 1.3, 2.3, '#3c4654'); p(4.7, .12, 1.1, 2.2, '#56616d'); p(5.95, 1.3, .12, .2, '#f4f4f4'); e(5.95, 1.3, .12, .2, '#9fe8ff');
    }) });
    sign('TP-LINK', 3.2, .7, 65.5, 2.52, FZ + .06, { bg: '#3fb6c4', fg: '#fff', size: .64 });
    const leds = [];
    { const g = grp(67.6, 5.3, FZ - 1.2); B(3, .42, 1.6, 0xf4f4f1, 0, 0, 0, g);
      [-1.2, 0, 1.2].forEach((ax, i) => { const a = B(.1, 1.7, .1, 0xf4f4f1, ax, .3, -.6, g); a.rotation.z = (i - 1) * -.22; });
      for (let i = 0; i < 5; i++) { const m = new THREE.MeshBasicMaterial({ color: 0x35e06f }); leds.push(m); B(.12, .1, .02, m, -.9 + i * .32, .12, .81, g, false); } }

    // 09 · the park (apps) — a rally, with the shuttle's flight drawn in the air, as Badminton Smash Speed does
    OX = 0;
    const PZ = FZ - 3.7, NETX = 94.8;
    B(11.8, .08, 9.6, 0x93b46a, 93.3, .1, FZ - 4.8, world, false);
    B(5.8, .02, 3.3, 0x4f9a7a, NETX, .18, PZ, world, false);
    [-1.65, 1.65].forEach(dz => B(5.8, .02, .07, 0xf4f4f1, NETX, .19, PZ + dz, world, false));
    [-2.9, 2.9, 0].forEach(dx => B(.07, .02, 3.3, 0xf4f4f1, NETX + dx, .19, PZ, world, false));
    [-1.7, 1.7].forEach(dz => B(.09, 1.6, .09, 0x33363d, NETX, .18, PZ + dz));
    B(.04, .72, 3.4, new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: .5 }), NETX, 1.0, PZ, world, false);
    B(.07, .07, 3.4, 0xf4f4f1, NETX, 1.72, PZ, world, false);
    B(2.6, .7, .45, 0x4f8a52, 88.9, SW, FZ - .15); B(1.3, .7, .45, 0x4f8a52, 98.5, SW, FZ - .15);            // hedges either side of the way in
    [91.0, 92.4].forEach(ux => { const g = grp(ux, SW, FZ + .1); [-.3, .3].forEach(dx => B(.07, .7, .07, 0xf2c029, dx, 0, 0, g)); B(.67, .07, .07, 0xf2c029, 0, .7, 0, g); });
    { const g = grp(89.2, SW, FZ + .42), cols = [0xc93a22, 0xf2c029, 0x3f7ea6, 0xf4f4f1, 0x2f3b57, 0xf07b22, 0x3fb6c4, 0xe9e3d6];   // notice board: one bill per app
      [-.85, .85].forEach(dx => B(.1, 1.9, .1, 0x5d4130, dx, 0, 0, g)); B(2, 1.25, .08, 0x2f5d4d, 0, .62, 0, g); B(2.2, .1, .3, 0x5d4130, 0, 1.87, 0, g);
      cols.forEach((c, i) => B(.36, .46, .02, c, -.69 + (i % 4) * .46, .74 + Math.floor(i / 4) * .54, .05, g, false)); }
    tree(88.4, FZ - 7.6, { s: 1.1 }); tree(98.2, FZ - 8.2); tree(96.4, FZ - 9, { s: .9, c: 0x3f7a4a });
    { const g = grp(98.3, .18, FZ - 2.2); B(1.5, .08, .46, 0xa5794f, 0, .42, 0, g); B(1.5, .4, .06, 0xa5794f, 0, .56, -.2, g); [-.6, .6].forEach(lx => B(.08, .42, .4, 0x33363d, lx, 0, 0, g)); }

    // across the road, then the campus
    OX = 26;
    tree(74.7, FZ - 1.2, { c: 0xe0b12e, c2: 0xf0c84a, h: 3.8 });
    // 10 · Waseda — brick clock tower and ginkgo in the late light
    const brick = 0x9d5f48, stone = 0xd9d0bf;
    bldg({ x: 78.4, w: 5.2, h: 4.6, d: 5.5, side: 0x8c5440, roof: 0x3d4250, front: paint(5.2, 4.6, (p, e, w, h) => {
        p(0, 0, w, h, '#a8674f'); for (let y = .3; y < h; y += .5) p(0, y, w, .04, '#96593f');
        p(0, 0, w, .4, '#d9d0bf'); p(0, 4.2, w, .16, '#d9d0bf');
        [.55, 2.05, 3.55].forEach(x => { p(x - .08, .9, 1.26, 2.5, '#d9d0bf'); p(x, .98, 1.1, 2.1, '#5f7f96'); p(x + .12, 3.08, .86, .24, '#5f7f96'); p(x + .5, .98, .08, 2.1, '#d9d0bf'); p(x, 2.0, 1.1, .08, '#d9d0bf'); e(x, .98, 1.1, 2.1, '#ffd58a'); });
    }) });
    roof(5.6, 1.7, 5.9, 0x3d4250, 78.4, 4.6, FZ - 2.75);
    bldg({ x: 82.3, w: 3, h: 7.6, d: 3, side: 0x8c5440, roof: 0x3d4250, front: paint(3, 7.6, (p, e, w, h) => {
        p(0, 0, w, h, '#a8674f'); for (let y = .3; y < h; y += .5) p(0, y, w, .04, '#96593f');
        p(0, 0, w, .4, '#d9d0bf'); p(0, 3.5, w, .16, '#d9d0bf'); p(0, 6.5, w, .16, '#d9d0bf'); p(0, 7.4, w, .2, '#d9d0bf');
        p(.9, .12, 1.2, 2.3, '#d9d0bf'); p(1, .12, 1, 2, '#3a2a22'); p(1.1, 2.12, .8, .2, '#3a2a22');
        [.5, 1.9].forEach(x => { p(x, 6.72, .6, .6, '#3a2a22'); });
    }) });
    roof(3.3, 2.6, 3.3, 0x3d4250, 82.3, 7.6, FZ - 1.5);
    const hands = (() => {
        const g = grp(82.3, 4.95, FZ + .05);
        const f = new THREE.Mesh(new THREE.CylinderGeometry(.74, .74, .08, 12), lam(stone)); f.rotation.x = Math.PI / 2; g.add(f);
        const f2 = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, .09, 12), lam(0xf8f4e8)); f2.rotation.x = Math.PI / 2; g.add(f2);
        for (let i = 0; i < 12; i += 3) { const a = i / 12 * Math.PI * 2; B(.08, .08, .02, 0x1c2230, Math.sin(a) * .5, Math.cos(a) * .5 - .04, .05, g, false); }
        const hr = grp(0, 0, .06, g), mn = grp(0, 0, .075, g);
        B(.09, .34, .02, 0x1c2230, 0, 0, 0, hr, false); B(.06, .52, .02, 0x1c2230, 0, 0, 0, mn, false);
        return [hr, mn];
    })();
    { const g = grp(77.5, 0, FZ + .5); B(2.9, 1.1, .34, stone, 0, 0, 0, g); sign('早稲田大学', 2.7, .72, 0, .22, .18, { bg: '#e6dece', fg: '#2a1512', size: .74, glow: .25 }, g); }
    tree(84.9, FZ - .4, { c: 0xe0b12e, c2: 0xf0c84a, h: 4.2, s: 1.1 });
    for (let i = 0; i < 16; i++) B(.1, .02, .1, R() < .5 ? 0xe0b12e : 0xf0c84a, 83.4 + R() * 3.4, SW, FZ + .3 + R() * 2.2, world, false);

    // 11 · Central South University — the gate, and the red-brick hall behind it
    tree(87.9, FZ - 1.4, { c: 0x3f7a4a, c2: 0x4f8a52, s: 1.1 });
    bldg({ x: 93, z: FZ - 3.6, w: 12, h: 6.4, d: 5, side: 0x8a3f33, roof: 0x666b73, front: paint(12, 6.4, (p, e, w, h) => {
        p(0, 0, w, h, '#9c4a3a'); p(0, 5.9, w, .5, '#e3dccd'); p(0, 0, w, .5, '#e3dccd');
        wins(p, e, { x: .6, y: 1.0, cols: 8, rows: 3, w: .9, h: 1.1, dx: 1.42, dy: 1.6, frame: '#e3dccd', bar: 1, lit: .55 });
    }) });
    { const g = grp(93, 0, FZ + .2), sm = 0xd9d2c4;
      [-3.3, 3.3].forEach(gx => { B(1, 3.5, .9, sm, gx, 0, 0, g); B(1.2, .22, 1.1, 0xc4bcaa, gx, 0, 0, g); });
      B(8.6, .95, 1, sm, 0, 3.5, 0, g); B(9, .2, 1.3, 0x7a3a30, 0, 4.45, 0, g); B(7.8, .16, 1.1, 0x8a4438, 0, 4.65, 0, g);
      sign('中南大学', 4.2, .72, 0, 3.6, .51, { bg: '#d9d2c4', fg: '#b02a20', size: .78, glow: .3 }, g); }
    tree(97.7, FZ - .9, { c: 0x3f7a4a, c2: 0x4f8a52, h: 3.8, s: 1.15 });
    bike(96.6, FZ + .35, 0xc93a22, .06);

    // 12 · the vending machines (skills)
    bldg({ x: 105, w: 8.6, h: 5.2, d: 5, side: 0x9b9d9f, roof: 0x70747a, front: paint(8.6, 5.2, (p, e, w, h) => {
        p(0, 0, w, h, '#b7b8b6'); p(0, 2.9, w, .14, '#8f9192');
        p(.5, .1, 4.6, 2.6, '#8a8f96'); for (let y = .2; y < 2.7; y += .22) p(.5, y, 4.6, .05, '#737980');     // shutter
        wins(p, e, Object.assign({ x: .9, y: 3.5, cols: 3, rows: 1, w: 1.3, h: 1.1, dx: 2.6, dy: 0, bar: 1, lit: .7 }, GL));
    }) });
    const vend = [];
    [[103.2, 0xf4f4f1, ['#e2483c', '#f2b632', '#3f9bd6', '#66a05e']], [104.35, 0xc93a22, ['#ffffff', '#f2b632', '#1c2230', '#e2483c']], [105.5, 0x2f66b0, ['#bfe0ff', '#ffffff', '#f2b632', '#66a05e']]].forEach(([vx, body, cans]) => {
        B(1.02, 1.86, .72, body, vx, SW, FZ + .46);
        const c = cv(26, 46), q = c.getContext('2d'); q.fillStyle = '#e9f2f6'; q.fillRect(0, 0, 26, 28); q.fillStyle = '#20242e'; q.fillRect(0, 28, 26, 18);
        for (let r = 0; r < 3; r++) { for (let k = 0; k < 5; k++) { q.fillStyle = pick(cans); q.fillRect(2 + k * 5, 2 + r * 9, 3, 6); } q.fillStyle = '#9aa7ad'; q.fillRect(1, 9 + r * 9, 24, 1); }
        q.fillStyle = '#f2c029'; q.fillRect(18, 31, 5, 3); q.fillStyle = '#5f6672'; q.fillRect(3, 31, 10, 2); q.fillStyle = '#0d0f14'; q.fillRect(4, 38, 18, 6);
        const m = new THREE.MeshBasicMaterial({ map: px(c) }); vend.push(m);
        const f = new THREE.Mesh(new THREE.PlaneGeometry(.86, 1.56), m); f.position.set(vx + OX, SW + .98, FZ + .83); world.add(f);
    });
    { const g = grp(107.5, SW, FZ + .6); B(1.5, .08, .46, 0xa5794f, 0, .42, 0, g); B(1.5, .4, .06, 0xa5794f, 0, .56, -.2, g); [-.6, .6].forEach(lx => B(.08, .42, .4, 0x33363d, lx, 0, 0, g));
      B(.42, .8, .42, 0x3f7ea6, -1.25, 0, 0, g); B(.44, .06, .44, 0x2a2a2e, -1.25, .8, 0, g); }
    pool(104.4, FZ + 1.5, 2.6, 0xcfe0ff);
    tree(111, FZ - 1.2);

    // 13 · home again, lights on, and the post box
    house(118, true); fence(109.4, 114.6);
    { const g = grp(115.6, SW, FZ + .75), red = 0xc93a22;
      C(.3, .33, .12, 10, 0x2a2a2e, 0, 0, 0, g); C(.27, .27, 1.02, 10, red, 0, .12, 0, g); C(.33, .31, .1, 10, red, 0, 1.14, 0, g); C(.12, .3, .14, 10, red, 0, 1.24, 0, g);
      B(.26, .05, .04, 0x1c2230, 0, .84, .27, g, false); B(.2, .14, .02, 0xf4efe2, 0, .5, .275, g, false); }
    pool(119.2, FZ + 1.2, 2.2, 0xffd9a0);

    // rows of ordinary buildings before the first stop and after the last
    const tones = [['#e6dfd0', 0xcfc8b8], ['#d5d9dc', 0xbcc1c5], ['#e9d9c4', 0xd2c2ad], ['#cfd6c8', 0xb8bfb1]];
    [[-9, 7], [-17.6, 8.4], [-27, 8.6], [126.4, 8], [135.4, 8.4], [144.6, 8]].forEach(([fx, fw]) => {
        OX = fx < 0 ? 0 : 26;
        const h = 5 + Math.floor(R() * 4) * 1.6, [base, side] = pick(tones);
        bldg({ x: fx, w: fw, h, d: 6, side, front: paint(fw, h, (p, e, w, hh) => {
            p(0, 0, w, hh, base); p(0, 0, w, .4, '#a8a296');
            wins(p, e, Object.assign({ x: .7, y: 1.1, cols: Math.floor((fw - .8) / 1.5), rows: Math.floor((hh - 1.2) / 1.6), w: .9, h: 1.05, dx: 1.5, dy: 1.6, lit: .5 }, GL));
        }) });
    });
    OX = 0; tree(-4.3, FZ - 1.2); OX = 26; tree(122.4, FZ - 1.4, { s: .9 });

    /* ---------- people ---------- */
    function person(x, z, o) {
        const me = grp(x, o.y == null ? SW : o.y, z), body = grp(0, 0, 0, me), skin = 0xf2c9a8, hair = 0x1d1b22;
        const legs = [-.115, .115].map(lx => { const g = grp(lx, .52, 0, body); B(.18, .46, .2, o.pants, 0, -.5, 0, g); B(.2, .1, .3, 0xf4f4f1, 0, -.52, .05, g); return g; });
        B(.5, .52, .3, o.top, 0, .5, 0, body);
        if (o.pack) { B(.3, .12, .02, 0xd99c1f, 0, .58, .16, body, false); B(.38, .44, .17, 0x2a2f3c, 0, .56, -.235, body); B(.4, .14, .14, o.top, 0, .98, -.16, body); }
        const arms = [-.32, .32].map(ax => { const g = grp(ax, 1.0, 0, body); B(.14, .42, .16, o.top, 0, -.42, 0, g); B(.12, .1, .13, skin, 0, -.51, 0, g); return g; });
        const head = grp(0, 1.02, 0, body);
        B(.46, .42, .42, skin, 0, 0, 0, head); B(.5, .16, .46, hair, 0, .33, 0, head); B(.5, .3, .12, hair, 0, .12, -.19, head); B(.5, .09, .06, hair, 0, .28, .22, head, false);
        [-.1, .1].forEach(ex => B(.06, .08, .02, 0x1d1b22, ex, .17, .211, head, false));
        return { me, body, legs, arms, head };
    }
    OX = 0;
    const { me, body, legs, arms, head } = person(0, WZ, { top: 0xf2b632, pants: 0x2b3550, pack: true });
    // the rally: each player swings the arm on the camera side
    const players = [[93.0, Math.PI / 2, 0, 0xf4f4f1, 0x3f7ea6], [96.6, -Math.PI / 2, 1, 0xc93a22, 0x2b2f3a]].map(([px_, rot, arm, top, pants]) => {
        const q = person(px_, PZ, { top, pants, y: .18 }); q.me.rotation.y = rot;
        const a = q.arms[arm]; B(.04, .5, .04, 0x33363d, 0, -1.0, 0, a, false);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(.17, .025, 4, 8), lam(0xf4f4f1)); ring.position.y = -1.16; ring.rotation.y = Math.PI / 2; a.add(ring);
        return a;
    });
    const shuttle = grp(NETX, 3, PZ); B(.13, .13, .13, 0xffffff, 0, -.065, 0, shuttle, false);
    const trail = []; for (let i = 0; i < 9; i++) trail.push(B(.1, .1, .1, new THREE.MeshBasicMaterial({ color: 0xf2c029 }), NETX, 3, PZ, world, false));
    const RALLY = 3.4;                                    // seconds, there and back
    function flight(t) {                                  // where the shuttle is at time t
        const u = 1 - Math.abs(((t / RALLY) % 1 + 1) % 1 * 2 - 1);
        return [mix(93.55, 96.05, u), 1.8 + 9.4 * u * (1 - u), u];
    }
    function swing(t, hitAt) {                            // racket arm angle around a hit
        const tau = ((t - hitAt) % RALLY + RALLY) % RALLY;
        if (tau > RALLY - .14) return mix(-2.9, -1.0, (tau - RALLY + .14) / .28);
        if (tau < .14) return mix(-2.9, -1.0, (tau + .14) / .28);
        return mix(-1.0, -2.9, clamp((tau - .14) / .8, 0, 1));
    }
    function rally(t) {
        const [sx, sy] = flight(t); shuttle.position.set(sx, sy, PZ);
        trail.forEach((m, i) => { const [tx, ty] = flight(t - (i + 1) * .055), k = 1 - (i + 1) / 10; m.position.set(tx, ty, PZ); m.scale.setScalar(.11 * k + .02); });
        players[0].rotation.x = swing(t, 0); players[1].rotation.x = swing(t, RALLY / 2);
    }
    rally(RALLY * .3);
    const porch = new THREE.PointLight(0xffd9a0, 0, 11, 1.4); porch.position.set(145.2, 2.6, FZ + 1.6); scene.add(porch);
    const vlight = new THREE.PointLight(0xdfeaff, 0, 9, 1.4); vlight.position.set(130.4, 1.8, FZ + 1.9); scene.add(vlight);

    /* ---------- a kei truck now and then ---------- */
    const truck = grp(-999, 0, 3.75);
    B(1.3, 1.25, 1.4, 0xf4f4f1, -.95, .32, 0, truck); B(.5, .5, 1.3, 0x7fa6c6, -1.38, .98, 0, truck, false);
    B(2.1, .34, 1.4, 0xd8d8d2, .8, .42, 0, truck); B(2.1, .9, 1.3, 0x3f7ea6, .8, .76, 0, truck);
    [[-1, .7], [-1, -.7], [1.1, .7], [1.1, -.7]].forEach(([tx, tz]) => B(.5, .5, .2, 0x1d1d22, tx, 0, tz, truck));
    const beamM = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xfff2c0, emissiveIntensity: 0 }); glows.push([beamM, 1.2]);
    B(.04, .16, .26, beamM, -1.62, .55, .45, truck, false); B(.04, .16, .26, beamM, -1.62, .55, -.45, truck, false);
    let truckAt = 12;

    /* ---------- light and time of day ---------- */
    const hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 1); scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 1); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -19, right: 19, top: 16, bottom: -9, near: 1, far: 110 }); sun.shadow.bias = -.0008; sun.shadow.radius = 2;
    scene.add(sun); scene.add(sun.target);
    const KEYS = [
        { h: 8, top: '#7fbdf2', bot: '#ffe6c4', sun: '#fff1dc', si: .8, hs: '#e4f0ff', hg: '#b8a48c', hi: .6, n: 0, lx: -.75, ly: .75, el: 9, az: 2 },
        { h: 12, top: '#4f9fea', bot: '#cfe8fb', sun: '#ffffff', si: .85, hs: '#e8f3ff', hg: '#b0a898', hi: .62, n: 0, lx: -.2, ly: 1.35, el: 40, az: 5 },
        { h: 15.5, top: '#5a9be4', bot: '#f6e3c0', sun: '#fff0d0', si: .85, hs: '#e6ecf8', hg: '#b5a590', hi: .62, n: 0, lx: .45, ly: .95, el: 22, az: 7 },
        { h: 17, top: '#5a78c8', bot: '#ffbf84', sun: '#ffc48c', si: .85, hs: '#eee4e2', hg: '#a89484', hi: .6, n: .1, lx: .8, ly: .6, el: 9.5, az: 8 },
        { h: 17.7, top: '#46509e', bot: '#ff9566', sun: '#ffa06a', si: .72, hs: '#d6c4d4', hg: '#8f7a78', hi: .56, n: .32, lx: .9, ly: .42, el: 4.5, az: 9 },
        { h: 18.5, top: '#232a66', bot: '#c7607a', sun: '#9a6a9a', si: .32, hs: '#8088c0', hg: '#5a5068', hi: .56, n: .78, lx: .8, ly: .5, el: -5, az: 10 },
        { h: 19.5, top: '#0b1030', bot: '#27356b', sun: '#8aa0ff', si: .3, hs: '#5d6cb0', hg: '#33344e', hi: .52, n: 1, lx: .45, ly: .9, el: -16, az: 10 }
    ];
    const COLS = ['top', 'bot', 'sun', 'hs', 'hg'], NUMS = ['si', 'hi', 'n', 'lx', 'ly', 'el', 'az'];
    KEYS.forEach(k => COLS.forEach(c => { k[c] = new THREE.Color(k[c]); }));
    const now = { top: new THREE.Color(), bot: new THREE.Color(), sun: new THREE.Color(), hs: new THREE.Color(), hg: new THREE.Color() };
    const white = new THREE.Color(0xffffff), tmp = new THREE.Color(), DEG = Math.PI / 180;
    let phone = false;
    function daylight(h, camX) {
        let i = 0; while (i < KEYS.length - 2 && h >= KEYS[i + 1].h) i++;
        const a = KEYS[i], b = KEYS[i + 1], k = clamp((h - a.h) / (b.h - a.h), 0, 1);
        COLS.forEach(c => now[c].copy(a[c]).lerp(b[c], k)); NUMS.forEach(c => { now[c] = mix(a[c], b[c], k); });
        skyU.top.value.copy(now.top); skyU.bot.value.copy(now.bot); skyU.night.value = now.n; scene.fog.color.copy(now.bot);
        const shrink = phone ? .3 : 1, el = now.el * (now.el > 0 ? shrink : 1) * DEG, az = now.az * (phone ? .45 : 1) * DEG;
        skyU.sunDir.value.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el));
        skyU.sunCol.value.copy(now.sun).multiplyScalar(clamp(now.el / 3 + .4, 0, 1));
        const mel = 10.5 * shrink * DEG, maz = (phone ? 4 : 9) * DEG;
        skyU.moonDir.value.set(Math.sin(maz) * Math.cos(mel), Math.sin(mel), -Math.cos(maz) * Math.cos(mel));
        hemi.color.copy(now.hs); hemi.groundColor.copy(now.hg); hemi.intensity = now.hi;
        sun.color.copy(now.sun); sun.intensity = now.si;
        const tx = Math.round(camX * 27) / 27;      // step with the shadow map's texels so shadows do not swim
        sun.target.position.set(tx, 0, -2); sun.position.set(tx + now.lx * 50, now.ly * 50, -2 + 31);
        glows.forEach(([m, g]) => { m.emissiveIntensity = now.n * g; });
        pools.forEach(m => { m.opacity = now.n * .55; });
        porch.intensity = now.n * 1.5; vlight.intensity = now.n * 1.3;
        cloudM.color.copy(white).lerp(now.bot, .35); cloudM.emissive.copy(now.bot).multiplyScalar(.4);
        fujiM.color.copy(now.bot).lerp(now.top, .6).multiplyScalar(mix(.92, .62, now.n)); snowM.color.copy(white).lerp(now.bot, .25 + now.n * .5);
        vend.forEach(m => m.color.setScalar(mix(.82, 1, now.n)));
    }

    /* ---------- camera ---------- */
    let rw = 1, rh = 1, dist = 14.5, scale = 3;
    function resize() {
        const W = innerWidth, H = innerHeight, aspect = W / H, t = 2 * Math.tan(FOV * DEG / 2);
        phone = W < 760;
        dist = clamp(7.6 / (t * aspect), 14.5, 30);                       // always show ≥ 7.6 m of street
        scale = clamp(Math.round(H / (t * dist) / 30), 2, 4);            // ≈ 30 screen pixels per metre
        rw = Math.ceil(W / scale); rh = Math.ceil(H / scale);
        renderer.setSize(rw, rh, false);
        camera.aspect = rw / rh;
        // keep the walker clear of the cards: right of them on a wide screen, above them on a phone
        let fx = .5, fy = .28;
        if (!phone) { const card = document.querySelector('.hero .card'); fx = clamp((card.getBoundingClientRect().right + W) / 2 / W, .5, .76); fy = .54; }
        camera.setViewOffset(rw, rh, (.5 - fx) * rw, (.5 - fy) * rh, rw, rh);
        camera.updateProjectionMatrix();
    }
    addEventListener('resize', resize); resize();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { redraw.forEach(f => f()); resize(); });

    /* ---------- every frame ---------- */
    const SAY = { start: 'いってきます！', apps: 'ナイスショット！', skills: 'どれにしよう…', contact: 'ただいま。' };
    const v3 = new THREE.Vector3();
    let fs = WALK.f, wx = WALK.at(WALK.xs, fs), phase = 0, face = .35, last = performance.now(), idle = 1, said = '';
    function frame(t) {
        requestAnimationFrame(frame);
        const dt = Math.min((t - last) / 1000, .05), s = t / 1000; last = t;
        fs = reduce ? WALK.f : fs + (WALK.f - fs) * (1 - Math.exp(-dt * 7));
        if (Math.abs(WALK.f - fs) < .0004) fs = WALK.f;
        const nx = WALK.at(WALK.xs, fs), dx = nx - wx, speed = Math.abs(dx) / Math.max(dt, .001); wx = nx;
        const moving = speed > .25;
        idle = clamp(idle + (moving ? -dt * 6 : dt * 3), 0, 1);
        phase += Math.min(Math.abs(dx) * 4.4, dt * 16);

        // walk cycle
        const sw = Math.sin(phase) * .72 * (1 - idle);
        legs[0].rotation.x = sw; legs[1].rotation.x = -sw; arms[0].rotation.x = -sw * .8; arms[1].rotation.x = sw * .8;
        body.position.y = Math.abs(Math.sin(phase)) * .05 * (1 - idle) + (reduce ? 0 : Math.sin(s * 2.2) * .008 * idle);
        const want = moving ? (dx > 0 ? Math.PI / 2 : -Math.PI / 2) : .35;
        face += (want - face) * (1 - Math.exp(-dt * (moving ? 14 : 5))); me.rotation.y = reduce ? want : face;
        me.position.x = wx;
        const stop = Math.round(fs), rest = idle > .9 && Math.abs(fs - stop) < .02;
        const wave = rest && stop === 0 && !reduce ? 1 : 0;                 // a wave on the doorstep
        arms[1].rotation.z += ((wave ? 2.5 + Math.sin(s * 7) * .28 : 0) - arms[1].rotation.z) * (1 - Math.exp(-dt * 9));
        head.rotation.y = idle * .25;

        // camera rides along
        const cx = wx, ty = 2.3;
        camera.position.set(cx, ty + dist * .07, WZ + dist); camera.lookAt(cx, ty, WZ);
        sky.position.copy(camera.position);
        fuji.position.x = cx + 105 - (cx - 86) * .05;

        const hour = WALK.at(WALK.hours, fs);
        daylight(hour, cx);
        hands[0].rotation.z = -(hour % 12) / 12 * Math.PI * 2; hands[1].rotation.z = -(hour % 1) * Math.PI * 2;

        if (!reduce) {
            clouds.forEach(c => { c.position.x += c.userData.v * dt; if (c.position.x > cx + 150) c.position.x = cx - 150; });
            tail.rotation.z = .5 + Math.sin(s * 1.6) * .35;
            liveDot.visible = (s % 1.2) < .7;
            typing.forEach((m, i) => m.color.setHex(Math.floor(s * 3) % 3 === i ? 0x2f3b57 : 0xa9b3c2));
            rally(s);
            leds.forEach((m, i) => m.color.setHex(Math.sin(s * 5 + i * 1.9) > -.2 ? 0x35e06f : 0x14532a));
            truckAt -= dt;
            if (truckAt < 0 && truck.position.x < cx - 30) { truck.position.x = cx + 30; truckAt = 22 + R() * 16; }
            if (truck.position.x > cx - 40) truck.position.x -= dt * 8.5;
        }

        // speech bubble follows his head
        const text = rest ? SAY[WALK.ids[stop]] : '';
        if (text) {
            if (text !== said) { bubble.textContent = said = text; }
            v3.set(wx, SW + 1.72, WZ).project(camera);
            bubble.style.transform = `translate(${((v3.x * .5 + .5) * innerWidth).toFixed(1)}px,${((-v3.y * .5 + .5) * innerHeight - 10).toFixed(1)}px) translate(-50%,-100%)`;
        }
        bubble.classList.toggle('on', !!text);

        renderer.render(scene, camera);
    }
    root.classList.add('gl');
    requestAnimationFrame(frame);
})();
