import { Middlewares } from 'core/Route';
import checkAuth from './checkAuth';

const middlewares: Middlewares = {};

middlewares.checkAuth = checkAuth;

export default middlewares;
