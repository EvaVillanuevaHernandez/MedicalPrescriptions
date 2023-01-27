import { validEmail } from "./Register";

describe('validEmail function', () => {
 
  test('with no value', () => {
    expect(validEmail(null)).toEqual(<div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>);
  });

  test('with wrong value', () => {
    expect(validEmail('hola')).toEqual(<div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>);
  });
  test('right value', () => {
    expect(validEmail('evaluna@gmail.com')).toEqual(undefined);
  });

})

