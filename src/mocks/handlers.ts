import { HttpResponse, http } from 'msw';
import { BASEURL } from '../constants/constants';
const members = [];

export const handlers = [
  http.post(`${BASEURL}/api/v1/users/register`, async ({ request }) => {
    const data = await request.json();
    members.push(data);
    return new HttpResponse(null, { status: 201 });
  }),
];
