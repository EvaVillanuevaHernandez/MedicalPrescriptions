import { required } from "./Login";


describe('required function', () => {
  
      test('with no value', () => {
        expect(required(null)).toEqual(<div className="alert alert-danger" role="alert">This field is required!</div>);
      });
      test('with value', () => {
        expect(required('hola')).toEqual(undefined);
      });
})
  