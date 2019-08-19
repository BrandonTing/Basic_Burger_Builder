import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null, 
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',        
        });
    });
    it('should store token upon login', () => {
        expect(reducer({
            token: null, 
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'SomeToken', 
            userId: 'SomeId',
        })).toEqual({
            token: 'SomeToken', 
            userId: 'SomeId',
            error: null,
            loading: false,
            authRedirectPath: '/',                
        })
    })
});