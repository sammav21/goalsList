package learn.goalsList.models;

public class Goal {
    private int goalId;
    private String name;
    private boolean checked;
    private String reason;
    private String realisticDeadline;
    private String ambitiousDeadline;
    private int appUserId;

    public int getGoalId() {
        return goalId;
    }

    public void setGoalId(int goalId) {
        this.goalId = goalId;
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

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getRealisticDeadline() {
        return realisticDeadline;
    }

    public void setRealisticDeadline(String realisticDeadline) {
        this.realisticDeadline = realisticDeadline;
    }

    public String getAmbitiousDeadline() {
        return ambitiousDeadline;
    }

    public void setAmbitiousDeadline(String ambitiousDeadline) {
        this.ambitiousDeadline = ambitiousDeadline;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }
}
