import prompt from 'prompt-sync';
import say from 'say';
import fs from 'fs';
import chalk from 'chalk';

process.stdout.write('\x1Bc'); // Clear terminal


async function mainLoop() {
    while(true) {
        const input = prompt()(`${process.cwd()}${chalk.bold('$')} `);
        if (input === "exit") break;

        if (input.startsWith('echo ')) {
            // Support echoing into files: echo hello > file.txt and echo hello >> file.txt
            const appendMatch = input.match(/^echo (.*?)(?:\s*>>\s*(.+))$/);
            const overwriteMatch = input.match(/^echo (.*?)(?:\s*>\s*(.+))$/);
            if (appendMatch) {
                const text = appendMatch[1];
                const file = appendMatch[2];
                try {
                    fs.appendFileSync(file.trim(), text);
                } catch (err) {
                    console.error(chalk.redBright("Error appending to file:", err.message));
                }
            } else if (overwriteMatch) {
                const text = overwriteMatch[1];
                const file = overwriteMatch[2];
                try {
                    fs.writeFileSync(file.trim(), text);
                } catch (err) {
                    console.error(chalk.redBright("Error writing to file:", err.message));
                }
            } else {
                // Just echo to terminal
                const text = input.slice(5);
                console.log(text);
            }
        } else if (input.startsWith('say ')) {
            await new Promise(resolve => {
                say.speak(input.slice(4), undefined, undefined, resolve);
            });
        } else if (input === 'pwd'.toLowerCase()) {
            console.log(process.cwd());
        } else if (input.startsWith('cd ')) {
            try {
                process.chdir(input.slice(3));
            } catch (err) {
                console.error(chalk.redBright("Error changing directory:", err.message));
            }
        } else if (input === 'ls'.toLowerCase()) {
            try {
                const files = fs.readdirSync(process.cwd());
                files.forEach(file => {
                    if (fs.statSync(file).isDirectory()) {
                        console.log(chalk.blueBright(file + '/'));
                    } else {
                        console.log(file);
                    }
                });
            } catch (err) {
                console.error(chalk.redBright("Error reading directory:", err.message));
            }
        } else if (input.startsWith('cat ')) {
            try {
                const arg = input.slice(4);
                const data = fs.readFileSync(arg, "utf8");
                console.log(data);
            } catch (err) {
                console.error(chalk.redBright("Error reading file:", err.message));
            }
        } else if (input === 'clear') {
            process.stdout.write('\x1Bc');
        } else if (input.startsWith('mkdir ')) {
            try {
                const dirName = input.slice(6).trim();
                if (!dirName) {
                    console.log(chalk.redBright("Choose a name for the dir bruhh"));
                } else {
                    fs.mkdirSync(dirName);
                }
            } catch (err) {
                console.log(chalk.redBright("Error creating directory:", err.message));
            }
        } else if (input.startsWith('touch ')) {
            try {
                const fileName = input.slice(6).trim();
                if (!fileName) {
                    console.log(chalk.redBright("Choose a name for the file bruhh"));
                } else {
                    fs.writeFileSync(fileName, "");
                }
            } catch (err) {
                console.log(chalk.redBright("Error creating file:", err.message));
            }
        } else if (input.startsWith('mv ')) {
            try {
                const [source, dest] = input.slice(3).split(' ');
                if (!source || !dest) {
                    console.log(chalk.redBright("mv: missing file operand"));
                } else {
                    fs.renameSync(source, dest);
                }
            } catch (err) {
                console.log(chalk.redBright("Error moving file:", err.message));
            }
        } else if (input.startsWith('rm ')) {
            try {
                const fileName = input.slice(3).trim();
                if (!fileName) {
                    console.log(chalk.redBright("rm: missing file operand"));
                } else if (fileName.endsWith('/')) {
                    // Remove directory
                    const dirName = fileName.replace(/\/+$/, '');
                    fs.rmdirSync(dirName, { recursive: true });
                } else {
                    // Remove file
                    fs.unlinkSync(fileName);
                }
            } catch (err) {
                console.log(chalk.redBright("Error removing file or directory:", err.message));
            }
        } else if (input.startsWith('cp ')) {
            try {
                const [source, dest] = input.slice(3).split(' ');
                if (!source || !dest) {
                    console.log(chalk.redBright("cp: missing file operand"));
                } else {
                    fs.copyFileSync(source, dest);
                }
            } catch (err) {
                console.log(chalk.redBright("Error copying file:", err.message));
            }
        } else if (input === 'whoami'.toLowerCase()) {
            console.log("Current user:", process.env.USER || process.env.USERNAME);
        } else if (input === 'help'.toLowerCase()) {
            console.log("Available commands:");
            console.log("  ls       - List files");
            console.log("  cat      - Read file");
            console.log("  clear    - Clear screen");
            console.log("  mkdir    - Create directory");
            console.log("  touch    - Create file");
            console.log("  mv       - Move file");
            console.log("  rm       - Remove file");
            console.log("  cp       - Copy file");
            console.log("  whoami   - Show current user");
            console.log("  help     - Show this help message");
        } else if (input === 'date' || input === 'DATE') {
            console.log(new Date().toLocaleString());
        } else {
            console.log("Unknown command:", input);
        }
    }
}

mainLoop();