document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // HELPERS
    // -------------------------

    function calc(low, high, weight) {
        return low + (high - low) * weight;
    }

    function weighted(scale, weight) {
        return scale * weight;
    }

    function compounded(scale, weight) {
        return scale * weight * weight;
    }

    // -------------------------
    // TAB SYSTEM
    // -------------------------

    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tabcontent");

    function animatePanels(container) {

        const panels = container.querySelectorAll(".panel, .panel2, .panel3");

        panels.forEach((panel, index) => {

            panel.style.animation = "none";

            // restart animation
            panel.offsetHeight;

            panel.style.animation =
                `panelFade .35s ease forwards ${index * 0.08}s`;

        });

    }

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = document.getElementById(tab.dataset.tab);

            if (!target) return;

            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            target.classList.add("active");

            animatePanels(target);

        });

    });

    // Animate first tab on load
    animatePanels(document.querySelector(".tabcontent.active"));

    // -------------------------
    // GENERATE TUNE
    // -------------------------

    document.querySelector(".saveButton").addEventListener("click", () => {

        const compound = document.getElementById("compound").value;

        const tireFront = document.getElementById("tireFront");
        const tireRear = document.getElementById("tireRear");

        const tireTunes = {
            Standard: { front: 55, rear: 55 },
            Snow: { front: 55, rear: 15 }
        };

        if (tireTunes[compound]) {

            tireFront.value = tireTunes[compound].front;
            tireRear.value = tireTunes[compound].rear;

        }

        // Alignment

        document.getElementById("frontcamber").value = -5.0;
        document.getElementById("rearcamber").value = -2.0;
        document.getElementById("fronttoe").value = 0.5;
        document.getElementById("reartoe").value = -0.5;
        document.getElementById("caster").value = 7;

        // Weight

        const frontWeight = Math.min(
            100,
            Math.max(
                0,
                parseFloat(document.getElementById("weight").value) || 0
            )
        );

        const fw = frontWeight / 100;
        const rw = 1 - fw;

        // Antiroll

        document.getElementById("frontantiroll").value = (64 * fw).toFixed(2);
        document.getElementById("rearantiroll").value = (64 * rw).toFixed(2);

        // Springs

        const fLow = parseFloat(document.getElementById("frontSpringLow").value) || 0;
        const fHigh = parseFloat(document.getElementById("frontSpringHigh").value) || 0;

        const rLow = parseFloat(document.getElementById("rearSpringLow").value) || 0;
        const rHigh = parseFloat(document.getElementById("rearSpringHigh").value) || 0;

        document.getElementById("frontsprings").value =
            calc(fLow, fHigh, fw).toFixed(2);

        document.getElementById("rearsprings").value =
            calc(rLow, rHigh, rw).toFixed(2);

        // Damping

        document.getElementById("reboundFront").value = (19 * fw).toFixed(2);
        document.getElementById("reboundRear").value = (19 * rw).toFixed(2);

        document.getElementById("bumpFront").value = (19 * fw * fw).toFixed(2);
        document.getElementById("bumpRear").value = (19 * rw * rw).toFixed(2);

        // Brakes

        document.getElementById("brakeBalance").value = 80;
        document.getElementById("brakePressure").value = 60;

        // Diff

        document.getElementById("diffAccel").value = 100;
        document.getElementById("diffDecel").value = 100;

    });

});