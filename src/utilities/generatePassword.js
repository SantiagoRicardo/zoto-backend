export const generatePassword = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newPassword = 'ZT_'

  for (let i = 0; i < 8; i++) {
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    newPassword += randomCharacter;
  }

  return { newPassword };
}
