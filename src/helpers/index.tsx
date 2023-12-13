export const generateId = () => {
  return Math.random().toString(36).slice(2);
};

export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return newDate.toLocaleDateString("es-ES", options);
}