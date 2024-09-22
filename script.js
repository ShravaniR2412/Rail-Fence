function railFenceEncrypt(plaintext, rails) {
    let rail = Array.from({ length: rails }, () => []);
    let dirDown = true;
    let row = 0;

    for (let char of plaintext) {
        rail[row].push(char);
        if (row === 0) dirDown = true;
        if (row === rails - 1) dirDown = false;
        row += dirDown ? 1 : -1;
    }

    return rail.flat().join('');
}

function railFenceDecrypt(ciphertext, rails) {
    let rail = Array.from({ length: rails }, () => Array(ciphertext.length).fill(' '));
    let dirDown = true;
    let row = 0;

    // Mark the positions in the rail
    for (let i = 0; i < ciphertext.length; i++) {
        rail[row][i] = '*';  // Mark positions
        if (row === 0) dirDown = true;
        if (row === rails - 1) dirDown = false;
        row += dirDown ? 1 : -1;
    }

    // Fill the rail with ciphertext
    let index = 0;
    for (let r = 0; r < rails; r++) {
        for (let c = 0; c < ciphertext.length; c++) {
            if (rail[r][c] === '*') {
                rail[r][c] = ciphertext[index++];
            }
        }
    }

    // Read the rail to decrypt
    let result = [];
    row = 0;
    for (let i = 0; i < ciphertext.length; i++) {
        if (rail[row][i] !== undefined) {
            result.push(rail[row][i]);
        }
        if (row === 0) dirDown = true;
        if (row === rails - 1) dirDown = false;
        row += dirDown ? 1 : -1;
    }

    return result.join('');
}

function processText(action) {
    const text = document.getElementById("text").value;
    const rails = parseInt(document.getElementById("rails").value);
    let output;

    if (action === 'encrypt') {
        output = railFenceEncrypt(text, rails);
    } else {
        output = railFenceDecrypt(text, rails);
    }

    document.getElementById("output").innerText = output;
}
