export const fetchProducts = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
