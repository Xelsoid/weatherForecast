const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_WEATHER_DATA':
      return { ...state, weatherData: action.payload.weatherData };

    default:
      return state;
  }
};

export default reducer;
