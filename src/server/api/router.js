export const callApiProducts = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
