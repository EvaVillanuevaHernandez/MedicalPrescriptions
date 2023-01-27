import { next } from './Home';

describe('next', () => {
  let component;

  beforeEach(() => {
    component = {
      animating: false,
      state: {
        activeIndex: 0,
      },
      setState: jest.fn(),
    };
  });

  it('increments the active index when animating is false', () => {
    next.bind(component)();
    expect(component.state.activeIndex).toBe(1);
    expect(component.setState).toHaveBeenCalledWith({ activeIndex: 1 });
  });

  it('resets the active index to 0 when it is the last item', () => {
    component.state.activeIndex = 2;
    component.items = [1, 2, 3];
    next.bind(component)();
    expect(component.state.activeIndex).toBe(0);
    expect(component.setState).toHaveBeenCalledWith({ activeIndex: 0 });
  });

  it('does not update the state when animating is true', () => {
    component.animating = true;
    next.bind(component)();
    expect(component.setState).not.toHaveBeenCalled();
  });
});