/**
 * Gets a date's strict ISO date string (without time)
 * @param date The date
 * @return The date's strict ISO string
 */
export function getStrictDateISO(date: Date): string {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
}

/**
 * Gets the hour and minutes of a date in HH:MM format
 *
 * @param date The date
 * @returns The HH:MM part of the date
 */
export function getHourAndMinutes(date: Date): string {
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}
