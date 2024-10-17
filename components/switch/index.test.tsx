import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Switch from ".";

describe("Switch Component", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockOnPress = jest.fn();

  const defaultProps = {
    width: 60,
    height: 30,
    activeColor: "#00FF00",
    inactiveColor: "#FF0000",
    onPress: mockOnPress,
  };

  it("should render switch container and circle", () => {
    const { getByTestId } = render(<Switch {...defaultProps} />);

    const container = getByTestId("switch-container");
    const circle = getByTestId("switch-circle");

    expect(container).toBeTruthy();
    expect(circle).toBeTruthy();
  });

  it("should call onPress when the switch is toggled to active", () => {
    const { getByTestId } = render(<Switch {...defaultProps} />);

    const container = getByTestId("switch-container");

    expect(mockOnPress).toHaveBeenCalledTimes(0);

    fireEvent.press(container);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("should change background color when toggled", () => {
    const { getByTestId, rerender } = render(<Switch {...defaultProps} />);

    const container = getByTestId("switch-container");

    expect(container.props.style.backgroundColor).toEqual("rgba(255, 0, 0, 1)");

    fireEvent.press(container);

    jest.advanceTimersByTime(500);
    rerender(<Switch {...defaultProps} />);

    expect(container.props.style.backgroundColor).toEqual("rgba(0, 255, 0, 1)");
  });

  it("should animate circle translation when toggled", () => {
    const { getByTestId, rerender } = render(<Switch {...defaultProps} />);

    const container = getByTestId("switch-container");
    const circle = getByTestId("switch-circle");

    expect(circle.props.style.transform).toEqual([{ translateX: 0 }]);

    fireEvent.press(container);

    jest.advanceTimersByTime(500);
    rerender(<Switch {...defaultProps} />);

    expect(circle.props.style.transform).toEqual([
      { translateX: expect.any(Number) },
    ]);
  });
});
