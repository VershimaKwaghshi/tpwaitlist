/* ===========================================
   TAKE PROFIT
   APP.JS
=========================================== */

"use strict";

/* ===========================================
   CONFIGURATION
=========================================== */

const CONFIG = {

    supabaseUrl: "YOUR_SUPABASE_PROJECT_URL",

    supabaseKey: "YOUR_SUPABASE_ANON_KEY"

};

let supabase = null;

if (
    CONFIG.supabaseUrl !== "YOUR_SUPABASE_PROJECT_URL" &&
    CONFIG.supabaseKey !== "YOUR_SUPABASE_ANON_KEY"
) {

    supabase = window.supabase.createClient(
        CONFIG.supabaseUrl,
        CONFIG.supabaseKey
    );

}


/* ===========================================
   DOM READY
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initialiseNavbar();

    initialiseHero();

    initialiseButtons();

    initialiseWaitlist();

    initialiseAnimations();

});


/* ===========================================
   NAVBAR
=========================================== */

function initialiseNavbar(){

    const navbar = document.querySelector(".navbar");

    if(!navbar) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>10){

            navbar.style.boxShadow="0 8px 30px rgba(0,0,0,.08)";

        }else{

            navbar.style.boxShadow="none";

        }

    });

}


/* ===========================================
   HERO BUTTONS
=========================================== */

function initialiseButtons(){

    const buttons=document.querySelectorAll(".waitlist-btn,.primary-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const section=document.querySelector(".waitlist");

            if(section){

                section.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

}


/* ===========================================
   HERO EFFECT
=========================================== */

function initialiseHero(){

    const hero=document.querySelector(".hero");

    if(!hero) return;

    hero.animate(

        [

            {

                opacity:0,

                transform:"translateY(40px)"

            },

            {

                opacity:1,

                transform:"translateY(0px)"

            }

        ],

        {

            duration:900,

            easing:"ease-out",

            fill:"forwards"

        }

    );

}


/* ===========================================
   FEATURE CARDS
=========================================== */

function initialiseAnimations(){

    const cards=document.querySelectorAll(".feature");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.animate(

                    [

                        {

                            opacity:0,

                            transform:"translateY(40px)"

                        },

                        {

                            opacity:1,

                            transform:"translateY(0)"

                        }

                    ],

                    {

                        duration:700,

                        fill:"forwards"

                    }

                );

            }

        });

    });

    cards.forEach(card=>observer.observe(card));

}
/* ===========================================
   3D MARKET VISUAL
=========================================== */

function initialiseChart3D(){

    const container=document.getElementById("chart3dStage");

    if(!container) return;

    if(typeof THREE==="undefined") return;


    const scene=new THREE.Scene();


    const camera=new THREE.PerspectiveCamera(

        45,

        container.clientWidth/container.clientHeight,

        0.1,

        1000

    );


    camera.position.set(0,8,18);



    const renderer=new THREE.WebGLRenderer({

        antialias:true,

        alpha:true

    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(

        container.clientWidth,

        container.clientHeight

    );

    container.appendChild(renderer.domElement);



    /* ---------- LIGHTS ---------- */

    const ambient=new THREE.AmbientLight(

        0xffffff,

        1

    );

    scene.add(ambient);


    const directional=new THREE.DirectionalLight(

        0xffffff,

        1.4

    );

    directional.position.set(

        5,

        8,

        6

    );

    scene.add(directional);



    /* ---------- BARS ---------- */

    const bars=[];

    const totalBars=30;


    for(let i=0;i<totalBars;i++){

        const geometry=new THREE.BoxGeometry(

            0.35,

            1,

            0.35

        );

        const material=new THREE.MeshStandardMaterial({

            color:0x2962ff,

            metalness:.25,

            roughness:.45

        });

        const mesh=new THREE.Mesh(

            geometry,

            material

        );

        mesh.position.x=(i-totalBars/2)*0.55;

        scene.add(mesh);

        bars.push(mesh);

    }



    /* ---------- GRID ---------- */

    const grid=new THREE.GridHelper(

        24,

        24,

        0xe5e7eb,

        0xf1f5f9

    );

    grid.position.y=-1;

    scene.add(grid);



    /* ---------- ANIMATION ---------- */

    function animate(){

        requestAnimationFrame(animate);


        const time=Date.now()*0.001;


        bars.forEach((bar,index)=>{

            const h=

                Math.sin(

                    time+

                    index*.4

                )*2.4+3.5;


            bar.scale.y=h;

            bar.position.y=h/2-0.5;

        });


        scene.rotation.y=Math.sin(time*.15)*0.18;


        renderer.render(

            scene,

            camera

        );

    }


    animate();



    /* ---------- RESPONSIVE ---------- */

    window.addEventListener("resize",()=>{

        camera.aspect=

            container.clientWidth/

            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            container.clientWidth,

            container.clientHeight

        );

    });

}


/* ===========================================
   START CHART
=========================================== */

document.addEventListener(

    "DOMContentLoaded",

    initialiseChart3D

);