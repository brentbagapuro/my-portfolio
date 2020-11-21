new fullpage('.fullpage', {
    //Navigation
    anchors: ['Main', 'Projects', 'Aboutme', 'Testimonial', 'Contact'],

    //Scrolling
    autoScrolling: true,
    dragAndMove: "fingersonly",

    //Styling
    verticalCentered: false,
});

particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('particles.js config loaded');
});

const burger = document.querySelector('.burger');
const nav = document.querySelector('.res-nav');

burger.addEventListener('click', function(e) {
    e.stopPropagation();
    if(nav.classList.contains('show')) {
        nav.classList.remove('show');
    } else {
        nav.classList.add('show');
    }
});

const projview = document.querySelector('.projects-view');
const proj_title = document.querySelector('#proj-title');
const projdesc = document.querySelector('.desc');
const projsamples = document.querySelector('.samples');
const respsamples = document.querySelector('.resp-samples');
const projlink = document.querySelector('#proj-link');
const gitlink = document.querySelector('#git-link');

projlink.addEventListener('click', e => e.stopPropagation());
gitlink.addEventListener('click', e => e.stopPropagation());

async function openProject (proj) {
    const data = await fetch("./assets/project-info.json")
        .then(res => res.json())
        .then(data => {
            return data;
        })
    
    let project;
    data.forEach(d => {
        if(d.proj_name === proj) {
            project = d;
        }
    })

    projview.classList.add('show');

    proj_title.innerHTML = project.proj_name;

    let proj_cover = document.createElement('img');
    proj_cover.src = project.proj_cover;
    let proj_about = document.createElement('p');
    proj_about.innerText = project.proj_about;

    projdesc.appendChild(proj_cover);
    projdesc.appendChild(proj_about);

    projlink.href = project.proj_link;
    gitlink.href = project.git_link;

    let proj_samples_arr = project.proj_samples;
    proj_samples_arr.forEach(p => {
        let proj_samples = document.createElement('img');
        proj_samples.src = p;
        projsamples.appendChild(proj_samples);
    })

    let resp_samples_arr = project.resp_samples;
    resp_samples_arr.forEach(r => {
        let resp_samples = document.createElement('img');
        resp_samples.src = r;
        respsamples.appendChild(resp_samples);
    })

}

const body = document.querySelector('body');

body.addEventListener('click', function() {
    if(projview.classList.contains('show')) {
        projview.classList.remove('show');
        projdesc.innerHTML = "";
        projsamples.innerHTML = "";
        respsamples.innerHTML = "";
    }
})
