import prompt from 'prompt-sync';
import say from 'say';
import fs from 'fs';
import chalk from 'chalk';

process.stdout.write('\x1Bc'); // Clear terminal

while(true) {
    // Get user input
    const input = prompt()('$ ');

    // Echo command. Check if the input starts with 'echo'
    if (input.startsWith('echo ')) {
        console.log(input.slice(5)); // Echo the input after 5 letters
    }

    // Say command. Check if the input starts with 'say'
    if (input.startsWith('say ')) {
        say.speak(input.slice(4)); // Speak the input after 4 letters
    }

    // Pwd command. Check if the input is 'pwd'
    if (input === 'pwd'.toLowerCase()) {
        console.log(process.cwd()); // Print the current working directory
    }

    // Cd command. Check if the input starts with 'cd'
    if (input.startsWith('cd ')) {
        process.chdir(input.slice(3)); // Change the current working directory
    }

    // Ls command. Check if the input is `ls`
    if (input === 'ls'.toLowerCase()) {
        const files = fs.readdirSync(process.cwd());
        files.forEach(file => {
            if (fs.statSync(file).isDirectory()) {
                console.log(chalk.blueBright(file + '/'));
            } else {
                console.log(file);
            }
        });
    }
}