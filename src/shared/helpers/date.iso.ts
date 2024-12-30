export const formatDateIso = (date: Date): string => {
  const isoString = date.toISOString()
  const [formattedDate] = isoString.split('T')
  return formattedDate
}
