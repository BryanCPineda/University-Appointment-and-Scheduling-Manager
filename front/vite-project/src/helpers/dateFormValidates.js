const isValidTime = (time) => {
      const [hour, minute] = time.split(":").map(Number)
      const totalMinutes = hour * 60 + minute
      const startTime = 8 * 60
      const endTime = 18 * 60

      return totalMinutes >= startTime && totalMinutes <= endTime
}


export const dateFormValidates = (inputs) => {

  const errors = {};
  const { date, time } = inputs;
  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (!date) {
    errors.date = "La fecha es obligatoria";
  } else if (selectedDateTime < now) {
    errors.date = "No puedes seleccionar una fecha pasada";
  } else if (selectedDateTime < twentyFourHoursLater) {
    errors.date =
      "Debes seleccionar una fecha con al menos 24 horas de anticipación";
  } else if (
    selectedDateTime.getDay() === 0 ||
    selectedDateTime.getDay() === 6
  ) {
    errors.date = "No se pueden agendar turnos los fines de semana";
  }

  if (!time) {
    errors.time = "La hora es obligatoria";
  } else if (!isValidTime(time)) {
    errors.time = "La hora debe estar entre las 8 AM y las 6 PM";
  }
  return errors;
}