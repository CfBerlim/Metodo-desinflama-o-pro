// main.js

document.addEventListener('DOMContentLoaded', () => {
  // O botão e as seções de vendas devem aparecer em exatos 4 minutos (240 segundos)
  // Para testes, o valor padrão pode ser reduzido, mas na produção deve ser 240000ms.
  // Vou usar 4 minutos reais como pedido (240.000 ms), mas adicionei um log para conferir.
  
  const DELAY_MS = 240000; 
  // const DELAY_MS = 1000; // Descomente para testar rapidamente


  
  console.log(`⏱️ Pitch timer started. UI will update in ${DELAY_MS / 1000} seconds.`);

  setTimeout(() => {
    // Revelar todos os elementos que possuem a classe .delay-hide
    const hiddenElements = document.querySelectorAll('.delay-hide');
    
    hiddenElements.forEach(el => {
      el.classList.remove('delay-hide');
      el.classList.add('fade-in'); // Adicionaremos uma animação de fade-in no css
    });

    console.log('✅ Pitch revealed!');
  }, DELAY_MS);
});
