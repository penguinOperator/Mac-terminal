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
            console.log(input.slice(5));
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
                    console.log(chalk.redBright("Please specify a directory name."));
                } else {
                    fs.mkdirSync(dirName);
                    console.log(chalk.greenBright(`Directory '${dirName}' created.`));
                }
            } catch (err) {
                console.log(chalk.redBright("Error creating directory:", err.message));
            }
        }

    }
}

mainLoop();