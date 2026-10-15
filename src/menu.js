// Used when the network is unavailable, so the app always has a menu to show.
export const fallbackMenu = [
  { name: 'Greek Salad', price: '12.99', description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.', image: 'greekSalad.jpg', category: 'starters' },
  { name: 'Bruschetta', price: '7.99', description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.', image: 'bruschetta.jpg', category: 'starters' },
  { name: 'Grilled Fish', price: '20.00', description: 'Barbequed catch of the day, with red onion, crisp capers, chive creme fraiche and a squeeze of lemon.', image: 'grilledFish.jpg', category: 'mains' },
  { name: 'Pasta', price: '18.99', description: 'Penne with fried aubergines, tomato sauce, fresh chilli, garlic, basil & salted ricotta.', image: 'pasta.jpg', category: 'mains' },
  { name: 'Lemon Dessert', price: '6.99', description: 'Light and fluffy traditional homemade Italian Lemon and ricotta cake.', image: 'lemonDessert.jpg', category: 'desserts' },
];

export const MENU_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

export const imageUrl = (file) =>
  `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${file}?raw=true`;

export const categories = ['starters', 'mains', 'desserts', 'drinks'];
