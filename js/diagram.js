export async function displayDiagramFromConfig (config) {
    let diagram = new Diagram(config);

    let canvas = document.querySelector('#drawing');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let ctx = canvas.getContext('2d');

    diagram.draw(ctx, width, height);
};

class Diagram {
    constructor (config) {
        this.config = config;

        this.colours = {
            artery: "#ed1c23",
            artery_above: "#eb9094",
            vein: "#4d6ef3",
            liver: "#9c5a3c"
        };
    }

    draw (ctx, w, h) {
        let c = this.config;
        
        ctx.clearRect(0,0,w,h);

        this.drawArterySkeleton(ctx, w, h);
        this.drawLiver(ctx, w, h);
        this.drawVenous(ctx, w, h);

        

        if (c.flv.present === true) {
            this.drawFLVArtery(ctx, w, h);
            this.drawFLVOrigin(c.flv.origin, ctx, w, h)
        }
        if (c.ampv.present === true) {
            this.drawAMPVArtery(ctx, w, h);
            this.drawAMPVOrigin(c.ampv.origin, ctx, w, h);
            this.drawAMPVBranches(c.ampv.branches, ctx, w, h);
        }
        if (c.pmpv.present === true) {
            this.drawPMPVArtery(ctx, w, h);
            this.drawPMPVOrigin(c.pmpv.origin, ctx, w, h);
            this.drawPMPVBranches(c.pmpv.branches, ctx, w, h);
        }
        if (c.smv.present === true) {
            this.drawSMVArtery(ctx, w, h);
            this.drawSMVOrigin(c.smv.origin, ctx, w, h);
            this.drawSMVBranches(c.smv.branches, ctx, w, h);
        }
    };

    drawLiver (ctx, w, h) {
        ctx.beginPath();

        ctx.moveTo(5, 5);
        ctx.lineTo(75, 5);
        ctx.lineTo(75, 61);
        ctx.lineTo(5, 91);
        ctx.lineTo(5, 5);
        ctx.closePath();

        ctx.moveTo(81, 5);
        ctx.lineTo(200, 5);
        ctx.lineTo(121, 41);
        ctx.lineTo(101, 20);
        ctx.lineTo(97, 24);
        ctx.lineTo(115, 42);
        ctx.lineTo(81, 57);
        ctx.lineTo(81, 5);
        ctx.closePath();

        ctx.fillStyle = this.colours.liver;
        ctx.fill();
    };

    drawVenous (ctx, w, h) {
        ctx.beginPath();

        ctx.moveTo(52, 37);
        ctx.lineTo(97, 37);
        ctx.lineTo(97, 43);
        ctx.lineTo(70, 44);
        ctx.lineTo(70, 91);
        ctx.lineTo(250, 91);
        ctx.lineTo(250, 98);
        ctx.lineTo(70, 99);
        ctx.lineTo(70, 200);
        ctx.lineTo(58, 200);
        ctx.lineTo(63, 44);
        ctx.lineTo(52, 43);
        ctx.lineTo(52, 37);
        ctx.closePath();

        ctx.fillStyle = this.colours.vein;
        ctx.fill();
    };

    drawArterySkeleton (ctx, w, h) {
        ctx.beginPath();

        ctx.moveTo(142, 0);
        ctx.lineTo(159, 0);
        ctx.lineTo(159, 200);
        ctx.lineTo(142, 200);
        ctx.lineTo(142, 0);
        ctx.closePath();

        ctx.fillStyle = this.colours.artery;
        ctx.fill();
    };

    drawFLVArtery (ctx, w, h) {
        ctx.beginPath();

        ctx.moveTo(99, 24);
        ctx.lineTo(101, 22);
        ctx.lineTo(123, 44);
        ctx.lineTo(121, 46);
        ctx.lineTo(99, 24);
        ctx.closePath();

        ctx.fillStyle = this.colours.artery;
        ctx.fill();
    };

    drawFLVOrigin (origin, ctx, w, h) {
        if (origin === "lga") {
            ctx.beginPath();

            ctx.moveTo(123, 44);
            ctx.lineTo(131, 44);
            ctx.lineTo(131, 39);
            ctx.lineTo(196, 39);
            ctx.lineTo(196, 42);
            ctx.lineTo(134, 42);
            ctx.lineTo(134, 50);
            ctx.lineTo(131, 50);
            ctx.lineTo(131, 46);
            ctx.lineTo(121, 46);
            ctx.lineTo(123, 44);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery_above;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery_above;
            ctx.fillText("LGA", 199, 43);

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery_above;
            ctx.fillText("?", 129, 58);
        }
        else if (origin === "aorta") {
            ctx.beginPath();

            ctx.moveTo(123, 44);
            ctx.lineTo(142, 44);
            ctx.lineTo(142, 46);
            ctx.lineTo(121, 46);
            ctx.lineTo(123, 44);
            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();
        }
    }

    drawAMPVArtery (ctx, w, h) {
        ctx.beginPath();

        ctx.moveTo(74, 68);
        ctx.lineTo(77, 68);
        ctx.lineTo(77, 86);
        ctx.lineTo(74, 86);
        ctx.lineTo(74, 68);

        ctx.closePath();

        ctx.fillStyle = this.colours.artery;
        ctx.fill();
    }

    drawAMPVOrigin (origin, ctx, w, h) {
        if (origin === "aorta") {
            ctx.beginPath();

            ctx.moveTo(77, 83);
            ctx.lineTo(142, 83);
            ctx.lineTo(142, 86);
            ctx.lineTo(77, 86);
            ctx.lineTo(77, 83);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();    
        }
        else if (origin === "ct") {
            ctx.beginPath();

            ctx.moveTo(77, 83);
            ctx.lineTo(131, 83);
            ctx.lineTo(131, 80);
            ctx.lineTo(126, 79);
            ctx.lineTo(126, 69);
            ctx.lineTo(142, 69);
            ctx.lineTo(142, 79);
            ctx.lineTo(134, 80);
            ctx.lineTo(134, 86);
            ctx.lineTo(77, 86);
            ctx.lineTo(77, 83);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("CT", 110, 76);
        }
        else if (origin === "sma") {
            ctx.beginPath();

            ctx.moveTo(74, 86);
            ctx.lineTo(77, 86);
            ctx.lineTo(77, 120);
            ctx.lineTo(125, 120);
            ctx.lineTo(125, 114);
            ctx.lineTo(142, 114);
            ctx.lineTo(142, 119);
            ctx.lineTo(131, 119);
            ctx.lineTo(131, 129);
            ctx.lineTo(125, 129);
            ctx.lineTo(125, 124);
            ctx.lineTo(74, 124);
            ctx.lineTo(74, 86);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("SMA", 120, 139);
        }
        else if (origin === "cm") {
            ctx.beginPath()

            ctx.moveTo(77, 83);
            ctx.lineTo(126, 83);
            ctx.lineTo(126, 69);
            ctx.lineTo(136, 69);
            ctx.lineTo(136, 81);
            ctx.lineTo(142, 81);
            ctx.lineTo(142, 88);
            ctx.lineTo(139, 88);
            ctx.lineTo(139, 91);
            ctx.lineTo(133, 91);
            ctx.lineTo(133, 88);
            ctx.lineTo(131, 88);
            ctx.lineTo(131, 79);
            ctx.lineTo(129, 79);
            ctx.lineTo(129, 86);
            ctx.lineTo(77, 86);
            ctx.lineTo(77, 83);

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("CT", 110, 76);

            ctx.moveTo(134, 99);
            ctx.lineTo(139, 99);
            ctx.lineTo(139, 109);
            ctx.lineTo(131, 109);
            ctx.lineTo(131, 129);
            ctx.lineTo(125, 129);
            ctx.lineTo(125, 103);
            ctx.lineTo(134, 103);
            ctx.lineTo(134, 99);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("SMA", 120, 139);            

        }
    }

    drawAMPVBranches (branches, ctx, w, h) {
        if (branches.indexOf('lha') > -1) {
            ctx.beginPath();

            ctx.moveTo(74, 65);
            ctx.lineTo(98, 65);
            ctx.lineTo(98, 39);
            ctx.lineTo(101, 39);
            ctx.lineTo(101, 68);
            ctx.lineTo(74, 68);
            ctx.lineTo(74, 65);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("LHA", 104, 58);
        }
        if (branches.indexOf('rha') > -1) {
            ctx.beginPath();

            ctx.moveTo(48, 40);
            ctx.lineTo(51, 40);
            ctx.lineTo(51, 65);
            ctx.lineTo(77, 65);
            ctx.lineTo(77, 68);
            ctx.lineTo(48, 68);
            ctx.lineTo(48, 40);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("RHA", 25, 58); 
        }
        if (branches.indexOf('gda') > -1) {
            ctx.beginPath();

            ctx.moveTo(35, 124);
            ctx.lineTo(45, 124);
            ctx.lineTo(45, 75);
            ctx.lineTo(74, 75);
            ctx.lineTo(74, 78);
            ctx.lineTo(48, 78);
            ctx.lineTo(48, 127);
            ctx.lineTo(35, 127);
            ctx.lineTo(35, 124);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery_above;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery_above;
            ctx.fillText("GDA", 14, 129); 
        }
    }

    drawPMPVArtery (ctx, w, h) {
        ctx.beginPath();

        ctx.moveTo(53,86);
        ctx.lineTo(56,86);
        ctx.lineTo(56,68);
        ctx.lineTo(53,68);
        ctx.lineTo(53,86);

        ctx.closePath();

        ctx.fillStyle = this.colours.artery;
        ctx.fill();
    }

    drawPMPVOrigin (origin, ctx, w, h) {
        if (origin === "n") {
        }
        else if (origin === "aorta") {
            ctx.beginPath();

            ctx.moveTo(53, 83);
            ctx.lineTo(142, 83);
            ctx.lineTo(142, 86);
            ctx.lineTo(53, 86);
            ctx.lineTo(53, 83);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill(); 
        }
        else if (origin === "ct") {
            ctx.beginPath();

            ctx.moveTo(53, 83);
            ctx.lineTo(131, 83);
            ctx.lineTo(131, 80);
            ctx.lineTo(126, 79);
            ctx.lineTo(126, 69);
            ctx.lineTo(142, 69);
            ctx.lineTo(142, 79);
            ctx.lineTo(134, 80);
            ctx.lineTo(134, 86);
            ctx.lineTo(53, 86);
            ctx.lineTo(53, 83);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("CT", 110, 76);
        }
        else if (origin === "sma") {
            ctx.beginPath();

            ctx.moveTo(53, 86);
            ctx.lineTo(56, 86);
            ctx.lineTo(56, 120);
            ctx.lineTo(125, 120);
            ctx.lineTo(125, 114);
            ctx.lineTo(142, 114);
            ctx.lineTo(142, 119);
            ctx.lineTo(131, 119);
            ctx.lineTo(131, 129);
            ctx.lineTo(125, 129);
            ctx.lineTo(125, 124);
            ctx.lineTo(53, 124);
            ctx.lineTo(53, 86);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("SMA", 120, 139);
        }
        else if (origin === "cm") {
            ctx.beginPath()

            ctx.moveTo(53, 83);
            ctx.lineTo(126, 83);
            ctx.lineTo(126, 69);
            ctx.lineTo(136, 69);
            ctx.lineTo(136, 81);
            ctx.lineTo(142, 81);
            ctx.lineTo(142, 88);
            ctx.lineTo(139, 88);
            ctx.lineTo(139, 91);
            ctx.lineTo(133, 91);
            ctx.lineTo(133, 88);
            ctx.lineTo(131, 88);
            ctx.lineTo(131, 79);
            ctx.lineTo(129, 79);
            ctx.lineTo(129, 86);
            ctx.lineTo(53, 86);
            ctx.lineTo(53, 83);

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("CT", 110, 76);

            ctx.moveTo(134, 99);
            ctx.lineTo(139, 99);
            ctx.lineTo(139, 109);
            ctx.lineTo(131, 109);
            ctx.lineTo(131, 129);
            ctx.lineTo(125, 129);
            ctx.lineTo(125, 103);
            ctx.lineTo(134, 103);
            ctx.lineTo(134, 99);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("SMA", 120, 139);  
        }
        else if (origin === "cha") {
            ctx.beginPath();

            ctx.moveTo(126, 79);
            ctx.lineTo(126, 79);
            ctx.lineTo(126, 69);
            ctx.lineTo(142, 69);
            ctx.lineTo(142, 79);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("CHA←CT", 84, 76);

            ctx.beginPath();
            
            ctx.moveTo(92, 80);
            ctx.lineTo(92,86);
            ctx.lineTo(53,86);
            ctx.lineTo(53,83);
            ctx.lineTo(89,83);
            ctx.lineTo(89,80);
            ctx.lineTo(92,80);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();
        }
    }

    drawPMPVBranches (branches, ctx, w, h) {
        if (branches.indexOf('lha') > -1) {
            ctx.beginPath();

            ctx.moveTo(53, 65);
            ctx.lineTo(98, 65);
            ctx.lineTo(98, 39);
            ctx.lineTo(101, 39);
            ctx.lineTo(101, 68);
            ctx.lineTo(53, 68);
            ctx.lineTo(53, 65);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("LHA", 104, 58);
        }
        if (branches.indexOf('rha') > -1) {
            ctx.beginPath();

            ctx.moveTo(48, 40);
            ctx.lineTo(51, 40);
            ctx.lineTo(51, 65);
            ctx.lineTo(56, 65);
            ctx.lineTo(56, 68);
            ctx.lineTo(48, 68);
            ctx.lineTo(48, 40);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("RHA", 25, 58); 
        }
        if (branches.indexOf('gda') > -1) {
            ctx.beginPath();

            ctx.moveTo(35, 124);
            ctx.lineTo(45, 124);
            ctx.lineTo(45, 75);
            ctx.lineTo(56, 75);
            ctx.lineTo(56, 78);
            ctx.lineTo(48, 78);
            ctx.lineTo(48, 127);
            ctx.lineTo(35, 127);
            ctx.lineTo(35, 124);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("GDA", 14, 129); 
        }
    }

    drawSMVArtery (ctx, w, h) {
        let c = this.config;
        if (c.pmpv.present === true && c.pmpv.origin === "n") {
            ctx.beginPath();
            
            ctx.moveTo(53,67);
            ctx.lineTo(56,67);
            ctx.lineTo(56,123);
            ctx.lineTo(53,123);
            ctx.lineTo(53,67);
            
            ctx.closePath();
            
            ctx.fillStyle = this.colours.artery;
            ctx.fill();
        }
        else {
            ctx.beginPath();

            ctx.moveTo(53,106);
            ctx.lineTo(56,106);
            ctx.lineTo(56,123);
            ctx.lineTo(53,123);
            ctx.lineTo(53,106);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();
        }
    }

    drawSMVOrigin (origin, ctx, w, h) {
        if (origin === "aorta") {
            ctx.beginPath();

            ctx.moveTo(53,120);
            ctx.lineTo(142,120);
            ctx.lineTo(142,123);
            ctx.lineTo(53,123);
            ctx.lineTo(53,120);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();
        }
        else if (origin === "sma") {
            ctx.beginPath();

            ctx.moveTo(53, 120);
            ctx.lineTo(56, 120);
            ctx.lineTo(56, 120);
            ctx.lineTo(125, 120);
            ctx.lineTo(125, 114);
            ctx.lineTo(142, 114);
            ctx.lineTo(142, 119);
            ctx.lineTo(131, 119);
            ctx.lineTo(131, 129);
            ctx.lineTo(125, 129);
            ctx.lineTo(125, 124);
            ctx.lineTo(53, 124);
            ctx.lineTo(53, 120);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("SMA", 120, 139);
        }
    }

    drawSMVBranches (branches, ctx, w, h) {
        if (branches.indexOf('lha') > -1) {
            ctx.beginPath();

            ctx.moveTo(53, 103);
            ctx.lineTo(98, 103);
            ctx.lineTo(98, 39);
            ctx.lineTo(101, 39);
            ctx.lineTo(101, 106);
            ctx.lineTo(53, 106);
            ctx.lineTo(53, 103);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("LHA", 104, 58);
        }
        if (branches.indexOf('rha') > -1) {
            ctx.beginPath();

            ctx.moveTo(48, 40);
            ctx.lineTo(51, 40);
            ctx.lineTo(51, 103);
            ctx.lineTo(56, 103);
            ctx.lineTo(56, 106);
            ctx.lineTo(48, 106);
            ctx.lineTo(48, 40);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("RHA", 25, 58); 
        }
        if (branches.indexOf('gda') > -1) {
            ctx.beginPath();

            ctx.moveTo(35, 124);
            ctx.lineTo(45, 124);
            ctx.lineTo(45, 103);
            ctx.lineTo(56, 103);
            ctx.lineTo(56, 106);
            ctx.lineTo(48, 106);
            ctx.lineTo(48, 127);
            ctx.lineTo(35, 127);
            ctx.lineTo(35, 124);

            ctx.closePath();

            ctx.fillStyle = this.colours.artery;
            ctx.fill();

            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = this.colours.artery;
            ctx.fillText("GDA", 14, 129); 
        }
    }
}