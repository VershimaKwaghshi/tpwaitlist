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
/* ===========================================
   WAITLIST
=========================================== */

async function initialiseWaitlist() {

    const form = document.querySelector(".waitlist form");

    if (!form) return;

    form.addEventListener("submit", submitWaitlist);

}


async function submitWaitlist(event) {

    event.preventDefault();


    const fullName = formValue(0);

    const email = formValue(1);

    const country = formValue(2);

    const referral = formValue(3);


    if (!fullName || !email || !country) {

        alert("Please complete all required fields.");

        return;

    }


    if (!validateEmail(email)) {

        alert("Please enter a valid email.");

        return;

    }


    const submitButton = document.querySelector(".waitlist button");

    submitButton.disabled = true;

    submitButton.textContent = "Joining...";


    const referralCode = createReferralCode();


    if (!supabase) {

        console.log({

            fullName,

            email,

            country,

            referral,

            referralCode

        });

        alert("Supabase not connected yet.\n\nYour information has been prepared successfully.");

        submitButton.disabled = false;

        submitButton.textContent = "Join Waitlist";

        return;

    }


    const { error } = await supabase

        .from("waitlist")

        .insert([

            {

                full_name: fullName,

                email: email,

                country: country,

                referred_by: referral,

                referral_code: referralCode

            }

        ]);


    if (error) {

        alert(error.message);

    } else {

        alert("Welcome to Take Profit.");

        document.querySelector(".waitlist form").reset();

    }


    submitButton.disabled = false;

    submitButton.textContent = "Join Waitlist";

}


/* ===========================================
   HELPERS
=========================================== */

function formValue(index) {

    return document

        .querySelectorAll(".waitlist input")

        [index]

        .value

        .trim();

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}


function createReferralCode() {

    const chars =

        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let code = "TP-";


    for (let i = 0; i < 6; i++) {

        code += chars.charAt(

            Math.floor(

                Math.random() * chars.length

            )

        );

    }


    return code;

}
/* ===========================================
   REFERRAL SYSTEM
=========================================== */

let currentReferral = "";

window.addEventListener("load", () => {

    readReferralFromURL();

});


function readReferralFromURL() {

    const params = new URLSearchParams(window.location.search);

    const ref = params.get("ref");

    if (!ref) return;

    currentReferral = ref;

    const referralInput = document.querySelectorAll(".waitlist input")[3];

    if (referralInput) {

        referralInput.value = ref;

    }

}


/* ===========================================
   USER DASHBOARD
=========================================== */

function buildDashboard(user) {

    const dashboard = document.createElement("section");

    dashboard.className = "dashboard";

    dashboard.innerHTML = `

        <div class="dashboard-card">

            <h2>Welcome ${user.full_name}</h2>

            <p>Your referral code</p>

            <h3>${user.referral_code}</h3>

            <input
                id="referralLink"
                value="${window.location.origin}${window.location.pathname}?ref=${user.referral_code}"
                readonly
            >

            <button id="copyReferral">

                Copy Referral Link

            </button>

        </div>

    `;

    document.body.appendChild(dashboard);

    document

        .getElementById("copyReferral")

        .addEventListener(

            "click",

            copyReferralLink

        );

}


/* ===========================================
   COPY LINK
=========================================== */

function copyReferralLink() {

    const input = document.getElementById("referralLink");

    input.select();

    input.setSelectionRange(0,99999);

    navigator.clipboard.writeText(input.value);

    alert("Referral link copied.");

}


/* ===========================================
   SESSION CHECK
=========================================== */

async function checkSession(){

    if(!supabase) return;

    const {

        data

    } = await supabase.auth.getSession();

    if(!data.session) return;

    const userId=data.session.user.id;

    const {

        data:user

    }=await supabase

        .from("waitlist")

        .select("*")

        .eq("id",userId)

        .single();

    if(user){

        buildDashboard(user);

    }

}


document.addEventListener(

    "DOMContentLoaded",

    checkSession

);
/* ===========================================
   AUTHENTICATION
=========================================== */

async function loginWithMagicLink(email){

    if(!supabase){

        alert("Supabase has not been connected.");

        return;

    }

    const { error } = await supabase.auth.signInWithOtp({

        email: email,

        options:{

            shouldCreateUser:true

        }

    });

    if(error){

        alert(error.message);

    }else{

        alert(

            "Check your email.\n\nA secure login link has been sent."

        );

    }

}



/* ===========================================
   USER REGISTRATION
=========================================== */

async function registerUser(data){

    if(!supabase) return;


    const {

        error

    } = await supabase

        .from("waitlist")

        .upsert([

            data

        ]);


    if(error){

        console.error(error);

    }

}



/* ===========================================
   LIVE WAITLIST COUNTER
=========================================== */

async function updateWaitlistCounter(){

    if(!supabase) return;


    const {

        count

    } = await supabase

        .from("waitlist")

        .select(

            "*",

            {

                count:"exact",

                head:true

            }

        );


    const counter=document.getElementById(

        "waitlistCounter"

    );

    if(counter){

        counter.innerHTML=

        Number(count).toLocaleString();

    }

}



/* ===========================================
   LIVE STATUS
=========================================== */

function createLiveStatus(){

    const badge=document.createElement("div");

    badge.className="liveStatus";

    badge.innerHTML=`

        <span class="liveDot"></span>

        System Online

    `;

    document.body.appendChild(badge);

}



/* ===========================================
   REFRESH EVERY 30 SECONDS
=========================================== */

setInterval(

    updateWaitlistCounter,

    30000

);



document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateWaitlistCounter();

        createLiveStatus();

    }

);