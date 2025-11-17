// 🎨 Test Script - Glassmorphism Header
// Copia in DevTools Console per verificare che le classi siano applicate

console.log('🔍 Verifica Glassmorphism Header...\n');

const header = document.querySelector('.qodeup-header-main');

if (!header) {
  console.error('❌ Header non trovato!');
} else {
  console.log('✅ Header trovato');
  
  // Verifica classe glass-style
  if (header.classList.contains('glass-style')) {
    console.log('✅ Classe "glass-style" applicata');
  } else {
    console.warn('⚠️ Classe "glass-style" NON applicata');
    console.log('💡 Aggiungi manualmente: header.classList.add("glass-style")');
  }
  
  // Verifica stili computati
  const styles = window.getComputedStyle(header);
  const backdropFilter = styles.backdropFilter || styles.webkitBackdropFilter;
  const background = styles.background;
  
  console.log('\n📊 Stili Applicati:');
  console.log('  backdrop-filter:', backdropFilter);
  console.log('  background:', background.substring(0, 50) + '...');
  
  if (backdropFilter && backdropFilter !== 'none') {
    console.log('\n🎉 GLASSMORPHISM ATTIVO!');
    console.log('  ✨ Effetto blur:', backdropFilter);
  } else {
    console.warn('\n⚠️ Backdrop filter non attivo');
    console.log('  Possibili cause:');
    console.log('  1. CSS non caricato');
    console.log('  2. Browser non supporta backdrop-filter');
    console.log('  3. Classe glass-style non applicata');
  }
}

// Verifica logo gradient
const logo = document.querySelector('.qodeup-logo-text');
if (logo) {
  const logoStyles = window.getComputedStyle(logo);
  const textFillColor = logoStyles.webkitTextFillColor || logoStyles.textFillColor;
  
  console.log('\n🎨 Logo Styles:');
  console.log('  -webkit-text-fill-color:', textFillColor);
  
  if (textFillColor === 'transparent' || textFillColor === 'rgba(0, 0, 0, 0)') {
    console.log('✅ Gradient sul logo ATTIVO!');
  } else {
    console.log('⚠️ Gradient sul logo non visibile');
  }
}

console.log('\n────────────────────────────────');
console.log('📝 Per applicare manualmente:');
console.log('  document.querySelector(".qodeup-header-main")?.classList.add("glass-style")');
console.log('────────────────────────────────\n');
