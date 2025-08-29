import prompt from 'prompt-sync';
import say from 'say';

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
}