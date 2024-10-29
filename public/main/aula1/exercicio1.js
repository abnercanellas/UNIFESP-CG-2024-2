export const exercicio1 = () => {
  console.log('exercicio1');

  // cria um carro uma flor e um palhaço simples com webgl
  // o carro é um retangulo azul com rodas pretas e janelas brancas
  // a flor é um circulo amarelo com petalas vermelhas
  // o palhaço é um circulo branco com olhos e boca pretos cabelos laranja e nariz vermelho
  // todos um ao lado do outro com 2rem de distancia entre eles
  const main = () => {
    const canvas = document.querySelector('#exercicio1')?.querySelector('canvas') ?? document.createElement('canvas');
    console.log(canvas);
    const gl = canvas.getContext('webgl');

    if (!gl) {
      throw new Error('WebGL not supported');
    }


    main();
  }
}
