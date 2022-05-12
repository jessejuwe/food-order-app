import { useEffect, useState } from 'react';

import Card from '../../UI/Card';
import Modal from '../../UI/Modal';
import MealItem from '../MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [httpError, setHTTPError] = useState();
  const [errorIsShown, setErrorIsShown] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-food-order-app-b1cb0-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      const loadedMeals = [];

      // Data Transformation Logic
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsloading(false);
    };

    // fetchMeals is an async function that returns a promise
    // traditional promise-only way of handling an error
    fetchMeals().catch(error => {
      setIsloading(false);
      setHTTPError(`💥 ${error.message} 💥`);
      setErrorIsShown(true);
    });
  }, []);

  // Data Loading Checker
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const hideErrorModalHandler = () => {
    setErrorIsShown(false);
  };

  if (errorIsShown) {
    return (
      <Modal onCloseCart={hideErrorModalHandler}>
        <section className={classes.mealsError}>
          <p>{httpError}</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={hideErrorModalHandler}>
              Close
            </button>
          </div>
        </section>
      </Modal>
    );
  }

  // Error Checker
  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // helper constant
  const mealsList = meals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
