const fetchProducts = async (busca) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${busca}`);
    const { results } = await response.json();
    return results;
  } catch (error) {
  console.log(error);  
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}