import prompt from 'prompt-sync';

process.stdout.write('\x1Bc'); // Clear terminal
const input = prompt()('$ ');
if (input.startsWith('echo ')) {
    console.log(input.slice(5));
} else {
    console.log(input);
}
