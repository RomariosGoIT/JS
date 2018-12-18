import Search from './models/Search';
import classes from './store/classes';

const { searchForm } = classes;

const state = {};

const controlSearch = async event => {
  event.preventDefault();

  const query = 'pizza';

  state.search = new Search(query);

  await state.search.getResults();

  console.log(state.search.result);
};

document.querySelector(searchForm).addEventListener('submit', controlSearch);
