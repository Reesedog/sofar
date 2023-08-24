class AddLabelToEntries < ActiveRecord::Migration[7.0]
  def change
    add_column :entries, :label, :string
  end
end
