const thief1 = {
    id: 1,
    name: "Arsène Lupin",
    email: "gentleman@cambrioleur.com",
    password: "$2a$10$er9NyjwBes8gMcAlT.u.p.rGGiMfIFCdhod70u5.86wfLrABNVxXW",
              // tophat
    imagePath: "arsene.gif",
};

const thief2 = {
    id: 2,
    name: "Doug Judy",
    email: "pontiac@bandit.com",
    password: "$2a$10$j26B30DBoMFCeEceWn.JNOQd7V.TeFq.BjQcu7yyXP.sWEpL/kwJ2",
              // rosa
    imagePath: "doug.webp",
};

const thieves = {
    "gentleman@cambrioleur.com": thief1,
    "pontiac@bandit.com": thief2,
};

module.exports = thieves;