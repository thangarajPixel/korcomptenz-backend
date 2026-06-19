// const validateDate = (date: any) => {
//   const selectedDate = new Date(date);
//   const currentDate = new Date();

//   // Set both dates to start of day for accurate comparison
//   selectedDate.setHours(0, 0, 0, 0);
//   currentDate.setHours(0, 0, 0, 0);

//   if (isNaN(selectedDate.getTime())) {
//     throw new Error('Please enter a valid date');
//   }

//   if (selectedDate < currentDate) {
//     throw new Error('Cannot select a date in the past');
//   }
// }

export default {
  beforeCreate(event) {
    // const { data } = event.params;
    // if (!data.date) {
    //   data.date = new Date();
    // }
    // validateDate(data.date);
  },

  beforeUpdate(event) {
    // const { data } = event.params;
    // if (data.date) {
    //   // validateDate(data.date);
    // }
  },
};
