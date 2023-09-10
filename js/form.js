import { displayDiagramFromConfig } from "./diagram.js";
import { displayScoreFromConfig } from "./score.js";
import { getAllUIElements, getUIElement } from "./ui.js";

document.querySelector('#form').addEventListener('change', async (e) => {
    await recalculateScore();
    
    e.preventDefault();
    e.stopPropagation();
});

export async function recalculateScore () {
    let isFLVPresent = (await getUIElement("flv-vessel")).state;
    let originOfFLV = (await getUIElement("flv-trace")).state;
    let isAMPVPresent = (await getUIElement("ampv-vessel")).state;
    let originOfAMPV = (await getUIElement("ampv-trace")).state;
    let branchesOfAMPV = (await getUIElement("ampv-branch")).state;
    let isPMPVPresent = (await getUIElement("pmpv-vessel")).state;
    let originOfPMPV = (await getUIElement("pmpv-trace")).state;
    let branchesOfPMPV = (await getUIElement("pmpv-branch")).state;
    let isSMVPresent = (await getUIElement("smv-vessel")).state;
    let originOfSMV = (await getUIElement("smv-trace")).state;
    let branchesOfSMV = (await getUIElement("smv-branch")).state;
    let isLeashPresent = (await getUIElement("leash-vessel")).state;

    let config = {
        flv: {
            present: isFLVPresent,
            origin: originOfFLV
        },
        ampv: {
            present: isAMPVPresent,
            origin: originOfAMPV,
            branches: branchesOfAMPV
        },
        pmpv: {
            present: isPMPVPresent,
            origin: originOfPMPV,
            branches: branchesOfPMPV
        },
        smv: {
            present: isSMVPresent,
            origin: originOfSMV,
            branches: branchesOfSMV
        },
        leash: isLeashPresent
    };

    await displayScoreFromConfig(config);
    await displayDiagramFromConfig(config);
};

export async function clearForm () {
    let eles = await getAllUIElements();
    eles.forEach((ele) => {
        ele.reset();
    });
};

await recalculateScore();