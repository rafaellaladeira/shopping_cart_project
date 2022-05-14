const fetchItem = async (id) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}