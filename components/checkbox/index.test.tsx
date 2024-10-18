import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Checkbox from ".";

describe("Checkbox Component", () => {
  const mockOnPress = jest.fn();

  const defaultProps = {
    size: 24,
    color: {
      active: "#000",
      fill: "#fff",
      stroke: "#ccc",
      checkMark: "#0f0",
    },
    onPress: mockOnPress,
  };

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders correctly with the provided props", () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} />);

    const checkbox = getByTestId("checkbox-svg");
    const animatedColor = getByTestId("animated-colorPath");
    const animatedCheckMark = getByTestId("animated-checkmark");

    expect(checkbox).toBeTruthy();
    expect(animatedColor).toBeTruthy();
    expect(animatedCheckMark).toBeTruthy();
  });

  it("calls onPress when checkbox is pressed", () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} />);

    const checkbox = getByTestId("checkbox-svg");
    fireEvent.press(checkbox);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
