export function convertTimeStringToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}
