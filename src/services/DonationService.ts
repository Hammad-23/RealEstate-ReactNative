import axios from 'axios'
 export const donationHouse = async (amount: number, description: string) => {
  var value = new FormData();
  value.append("amount", amount);
  value.append("description", description);
  const result = await axios.post("donation/house", value, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return Promise.resolve(result.data);
} 