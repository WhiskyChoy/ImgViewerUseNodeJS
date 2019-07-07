export function clearCanvas(input) {
    if (input instanceof HTMLCanvasElement) {
        let pen = input.getContext('2d');
        pen.clearRect(0, 0, input.width, input.height);
    }
}