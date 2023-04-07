import axios from 'axios'
declare interface Ret {
  [key: string]: any;
}
export const getAlltodos = async (): Promise<Ret> => (await axios.get('/api/todo')).data
export const getFindtodos = async (id: string): Promise<Ret> => (await axios.get(`/api/todo/${id}`)).data
export const postAddtodos = async (content: string): Promise<Ret> => (await axios.post('/api/todo/add', { content })).data
export const postDeltodos = async (id: string): Promise<Ret> => (await axios.post('/api/todo/delete', { id })).data
export const postUpdatetodos = async (item: Ret): Promise<Ret> => (await axios.post('/api/todo/put', item)).data


export const insertAddtodos = async (): Promise<Ret> => await axios.post('/api/todo/insert')
