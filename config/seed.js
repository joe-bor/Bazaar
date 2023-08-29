/*
Create Users
    - check model for the shape

For each user, create a shop
    - check model for shape

Populate their shops with items,
    - use fetchData()
*/



async function fetchData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
      return data.products;
  
    } catch (error) {
      console.error('Fetch error:', error);
      throw error
    }
  }
  
  (async () => {
    try {
      const products = await fetchData('https://dummyjson.com/products?limit=100');
  
      const sanitized = products.map(product => {
        let name = product.title;
        let price = product.price;
        let comments = null;
        let description = product.description;
        let category = product.category;
        let images = product.images; //this is an array 
  
        return {
          name,
          price,
          comments,
          description,
          category,
          images,
        };
      });
      
      const categories = [...new Set(sanitized.map(product => product.category))]
  
      console.log(`Total items: ${sanitized.length}`);
      console.log(categories)
      console.log(`# of categories: ${categories.length}`)
  
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  
  