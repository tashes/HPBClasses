export async function displayScoreFromConfig (config) {
    try {
        let score = new Score(config);
        document.querySelector("#score").innerHTML = score.toHTML();
        document.querySelector('#drawing_error').innerHTML = "";
    }
    catch (e) {
        document.querySelector('#drawing_error').innerHTML = e.message;
    }
};

export class Score {
    constructor (config) {
        this.config = config
    }

    toHTML () {
        let c = this.config;
        let txt = "";

        if (c.flv.present === true) {
            txt += "W";
            switch (c.flv.origin) {
                case "lga": txt += "1"; break;
                case "aorta": txt += "2"; break;
                default:
                    throw new Error("Invalid FLV Vessel Origin");
                    break;
            }
        }

        if (c.ampv.present === true) {
            txt += "X";
            switch (c.ampv.origin) {
                case "aorta": txt += "1"; break;
                case "ct": txt += "2"; break;
                case "sma": txt += "3"; break;
                case "cm": txt += "4"; break;
                default:
                    throw new Error("Invalid Left MPV Vessel Origin");
                    break; 
            }
            if (c.ampv.branches.length > 0) {
                let branches = c.ampv.branches;
                txt += "<sub>";
                if (branches.indexOf("lha") > -1) { txt += "L"; }
                if (branches.indexOf("rha") > -1) { txt += "R"; }
                if (branches.indexOf("gda") > -1) { txt += "G"; }
                txt += "</sub>";
            }
        }

        if (c.pmpv.present === true) {
            txt += "Y";
            switch (c.pmpv.origin) {
                case "n": txt += "0"; break;
                case "aorta": txt += "1"; break;
                case "ct": txt += "2"; break;
                case "sma": txt += "3"; break;
                case "cm": txt += "4"; break;
                case "cha": txt += "5"; break;
                default:
                    throw new Error("Invalid Right MPV Vessel Origin");
                    break; 
            }
            if (c.pmpv.branches.length > 0) {
                // if (c.pmpv.origin === "n") throw new Error("Invalid branches of Right MPV Vessel with no zone 2 origins");
                let branches = c.pmpv.branches;
                txt += "<sub>";
                if (branches.indexOf("lha") > -1) { txt += "L"; }
                if (branches.indexOf("rha") > -1) { txt += "R"; }
                if (branches.indexOf("gda") > -1) { txt += "G"; }
                txt += "</sub>";
            }
        }

        if (c.smv.present === true) {
            txt += "Z";
            switch (c.smv.origin) {
                case "aorta": txt += "1"; break;
                case "sma": txt += "2"; break;
                default:
                    throw new Error("Invalid Right MPV Vessel Origin");
                    break; 
            }
            if (c.smv.branches.length > 0) {
                let branches = c.smv.branches;
                txt += "<sub>";
                if (branches.indexOf("lha") > -1) { txt += "L"; }
                if (branches.indexOf("rha") > -1) { txt += "R"; }
                if (branches.indexOf("gda") > -1) { txt += "G"; }
                txt += "</sub>";
            }
        }

        if (c.leash === true) {
            txt += " + Leash Vessels";
        }

        if (
            c.flv.present === false &&
            c.ampv.present === false &&
            c.pmpv.present === false &&
            c.smv.present === false &&
            c.leash === false
        ) {
            txt = "-";
        }

        return txt;
    };
}