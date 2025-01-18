import axiosInstance from '../axiosInstance';

export const GetHistory = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/patients/${id}/statuses`);
    return response.data[0];
  } catch (error) {
    console.log('환자 기록 리스트 가져오기 실패', error);
  }
};
