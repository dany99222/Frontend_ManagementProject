


export const generateColor = () => {
      const colores = [
    'bg-blue-200',
    'bg-teal-200',
    'bg-cyan-200',
    'bg-purple-200',
    'bg-rose-200',
    'bg-pink-200'
  ];

   const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

    return colorAleatorio
}