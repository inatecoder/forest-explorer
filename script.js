// Data for the layers
const layerData = {
    emergent: {
        title: "The Emergent Layer",
        subtitle: "The Penthouse",
        desc: "The skyscraper tops of the forest! Giant trees here, like the Kapok, stick out above everything else. They face strong winds and hot sun, so they have small, waxy leaves.",
        animals: [
            { name: "Harpy Eagle Prowling", icon: "🦅" },
            { name: "Blue Morpho Butterfly", icon: "🦋" },
            { name: "Fruit Bats", icon: "🦇" }
        ],
        color: "text-orange-600",
        bg: "bg-orange-50",
        image: "linear-gradient(to bottom, #fef3c7, #fff7ed)"
    },
    canopy: {
        title: "The Canopy Layer",
        subtitle: "The Green Roof",
        desc: "This is the busiest part of the forest! Branches and leaves overlap like a roof, blocking 95% of sunlight. Most rainforest animals live here because there's so much food.",
        animals: [
            { name: "Howler Monkey", icon: "🐒" },
            { name: "Keel-billed Toucan", icon: "🦜" },
            { name: "Three-Toed Sloth", icon: "🦥" }
        ],
        color: "text-green-600",
        bg: "bg-green-50",
        image: "linear-gradient(to bottom, #dcfce7, #f0fdf4)"
    },
    understorey: {
        title: "The Understorey",
        subtitle: "The Dark Middle",
        desc: "It's dark, humid, and still here. Plants have huge leaves to catch the tiny slivers of sunlight that get through the canopy. Jaguars hide here waiting for prey.",
        animals: [
            { name: "Red-Eyed Tree Frog", icon: "🐸" },
            { name: "Jaguar", icon: "🐆" },
            { name: "Boa Constrictor", icon: "🐍" }
        ],
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        image: "linear-gradient(to bottom, #ecfccb, #f7fee7)"
    },
    floor: {
        title: "The Forest Floor",
        subtitle: "The Recycling Center",
        desc: "Pitch black and covered in dead leaves (humus). It might seem quiet, but an army of decomposers is working hard to recycle nutrients back into the soil!",
        animals: [
            { name: "Leafcutter Arts", icon: "🐜" },
            { name: "Giant Anteater", icon: "🦗" },
            { name: "Tapir", icon: "🐗" }
        ],
        color: "text-amber-800",
        bg: "bg-amber-50",
        image: "linear-gradient(to bottom, #fffbeb, #fff7ed)"
    }
};

// --- Layer Logic ---
function updateLayer(layerKey) {
    const data = layerData[layerKey];
    const display = document.getElementById('layer-display');
    const content = document.getElementById('layer-content');

    // Update Active Button State
    document.querySelectorAll('.layer-card').forEach(el => {
        el.classList.remove('active-layer');
    });
    document.getElementById(`btn-${layerKey}`).classList.add('active-layer');

    // Animate content out
    content.style.opacity = '0';
    content.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        // Build Animal Tags
        const animalTags = data.animals.map(a => 
            `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-medium shadow-sm">
                <span>${a.icon}</span> ${a.name}
            </span>`
        ).join('');

        // Inject Content
        content.innerHTML = `
            <div class="h-full flex flex-col pt-4">
                <div class="flex items-start justify-between mb-6">
                    <div>
                        <span class="text-sm font-bold tracking-wider uppercase ${data.color} opacity-70 mb-1 block">${data.subtitle}</span>
                        <h2 class="text-4xl font-bold text-slate-800 mb-2">${data.title}</h2>
                    </div>
                </div>
                
                <p class="text-lg text-slate-600 leading-relaxed mb-8 flex-grow">
                    ${data.desc}
                </p>

                <div class="mt-auto">
                    <h4 class="font-bold text-slate-400 text-xs uppercase tracking-widest mb-3">Key Inhabitants</h4>
                    <div class="flex flex-wrap gap-2">
                        ${animalTags}
                    </div>
                </div>
            </div>
            <!-- Decorative Large Icon -->
            <div class="absolute -bottom-10 -right-5 text-9xl opacity-10 pointer-events-none select-none">
                ${data.animals[0].icon}
            </div>
        `;

        // Update Background Style
        display.style.background = data.image;

        // Animate content in
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 300);
}

// Initialize with Canopy
window.onload = () => updateLayer('canopy');


// --- Photosynthesis Game Logic ---
let plantCount = 0;
const MAX_TREES = 10;

function plantTree() {
    if (plantCount >= MAX_TREES) {
        alert("The forest is fully restored! Great job!");
        return;
    }

    plantCount++;
    const forestPlot = document.getElementById('forest-plot');
    const emptyState = document.getElementById('empty-state');
    
    // Remove empty state text
    if(emptyState) emptyState.style.display = 'none';

    // Add Tree
    const tree = document.createElement('div');
    tree.innerHTML = '🌳';
    tree.className = 'text-4xl tree-pop drop-shadow-md';
    // Randomize slight size and rotation for natural look
    const scale = 0.8 + Math.random() * 0.4;
    const rotate = -5 + Math.random() * 10;
    tree.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    
    forestPlot.appendChild(tree);

    // Update Meters
    updateMeters();
}

function updateMeters() {
    // CO2 starts high (90%), O2 starts low (10%)
    // Goal: CO2 ~ 20%, O2 ~ 80%
    const progress = plantCount / MAX_TREES; 
    
    const co2Val = 90 - (progress * 70); // 90 -> 20
    const o2Val = 10 + (progress * 70); // 10 -> 80

    const co2Bar = document.getElementById('co2-bar');
    const o2Bar = document.getElementById('o2-bar');
    const co2Text = document.getElementById('co2-text');
    const o2Text = document.getElementById('o2-text');

    co2Bar.style.width = `${co2Val}%`;
    o2Bar.style.width = `${o2Val}%`;

    // Colors change as they get better
    if(co2Val < 40) {
        co2Bar.classList.replace('bg-red-500', 'bg-green-500');
        co2Text.innerText = "Safe Levels";
        co2Text.className = "text-green-300";
    } else {
        co2Text.innerText = `High (${Math.round(co2Val)}%)`;
    }

    if(o2Val > 60) {
        o2Bar.classList.replace('bg-blue-500', 'bg-blue-300'); // lighter blue for airy feel
        o2Text.innerText = "Optimal";
        o2Text.className = "text-blue-300";
    } else {
        o2Text.innerText = `Low (${Math.round(o2Val)}%)`;
    }

    if(plantCount === MAX_TREES) {
        document.getElementById('plant-btn').innerHTML = '<i class="fas fa-check"></i> Forest Restored!';
        document.getElementById('plant-btn').classList.add('bg-blue-500', 'text-white');
    }
}


// --- Drag and Drop Quiz Logic ---
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add('dragging');
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('drag-over');
}

function leaveDrop(ev) {
    ev.currentTarget.classList.remove('drag-over');
}

function drop(ev) {
    ev.preventDefault();
    const zone = ev.currentTarget;
    zone.classList.remove('drag-over');
    
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    draggedElement.classList.remove('dragging');

    // Logic Check
    const correctMap = {
        'drop-producer': 'drag-grass',
        'drop-herbivore': 'drag-deer', // or others if added
        'drop-carnivore': 'drag-lion'
    };

    if (correctMap[zone.id] === data) {
        // Success
        zone.innerHTML = ""; // Clear "Drop here" text
        draggedElement.style.border = "none";
        draggedElement.style.boxShadow = "none";
        draggedElement.style.background = "transparent";
        zone.appendChild(draggedElement);
        zone.classList.add('bg-green-100', 'border-green-300');
        
        // Disable drag on success
        draggedElement.setAttribute('draggable', 'false');
        
        checkWinCondition();
    } else {
        // Fail Animation
        zone.classList.add('bg-red-100');
        setTimeout(() => zone.classList.remove('bg-red-100'), 500);
    }
}

function checkWinCondition() {
    const p = document.getElementById('drop-producer').children.length > 0;
    const h = document.getElementById('drop-herbivore').children.length > 0;
    const c = document.getElementById('drop-carnivore').children.length > 0;

    if (p && h && c) {
        const res = document.getElementById('quiz-result');
        res.innerHTML = "🎉 Perfect! You built a complete Food Chain!";
        res.classList.remove('hidden');
        res.classList.add('bg-green-100', 'text-green-700', 'block');
    }
}

// --- Utils ---
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
