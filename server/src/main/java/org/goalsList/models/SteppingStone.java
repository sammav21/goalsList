package org.goalsList.models;

public class SteppingStone {

    private int steppingStoneId;
    private String name;
    private boolean checked;

    private int goalId;

    public int getSteppingStoneId() {
        return steppingStoneId;
    }

    public void setSteppingStoneId(int steppingStoneId) {
        this.steppingStoneId = steppingStoneId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public int getGoalId() {
        return goalId;
    }

    public void setGoalId(int goalId) {
        this.goalId = goalId;
    }
}
